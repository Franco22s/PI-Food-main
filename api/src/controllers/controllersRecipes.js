require('dotenv').config();
const {YOUR_API_KEY} = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`;
const axios = require('axios');
const {Recipe, Diet} = require('../db')
const { Op } = require("sequelize");
const Diets = require('../models/Diets');

const getApiInfo = async () => {
      const apiUrl = await axios.get(URL);
      const info = apiUrl.data.results.map(e => {
        return {
          id: e.id,
          name: e.title,
          image: e.image,
          summary: e.summary,
          healthScore: e.healthScore,
          diets: e.diets?.map((diet) => diet),
          analyzedInstructions: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps
            ? e.analyzedInstructions[0].steps.map(el => el.step).join(" ")
            : 'No hay pasos')
        }; 
      });
  
      return info;
    };


const getData = async () => {
try {
  const getDB = await Recipe.findAll({
  include: {
    model: Diet,
    atributes: ['name'],
    through: {
        atributes: ['id', 'name'],
      },
    },
  });

  const allRecipes = await getDB?.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      analyzedInstructions: recipe.analyzedInstructions,
      diets: recipe.diets?.map((diet) => diet.name),
    };
  });

  return allRecipes;

}
catch (error) {
  const errorMessage = 'There was an error during de petition to the Data Base "Food": ' + error.message;
  console.log(errorMessage);
  return;
}
}


const getAllRecipes = async () =>{
    let apiInfo = await getApiInfo();
    let dbInfo = await getData();
    allInfo = apiInfo.concat(dbInfo);
    return allInfo;
};


const getRecipesByName = async (req, res) => {
    try {
      const { name } = req.query;
      const allRecipes = await getAllRecipes();
      
      if (name) {
        const recipeByName = allRecipes.filter(reci =>
          reci.name.toLowerCase().includes(name.toLowerCase())
        );
      if(!recipeByName.length) throw new Error("No tenemos disponible la receta");
        
      res.status(200).json(recipeByName);

      } else {
        res.status(200).json(allRecipes);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

const getRecipeById = async (req, res) =>{
    try {
        const {id} = req.params;
        const allRecipes = await getAllRecipes();
        if(isNaN(id)){
            let recipeNan = allRecipes.find((e) => e.id === id);
            recipeNan
            ? res.status(200).json(recipeNan)
            : res.status(404).send('No se encontró recetas con ese id');
        } else{
            let recipeNumb = allRecipes.find((el) => el.id === Number(id))
            recipeNumb
            ? res.status(200).json(recipeNumb)
            : res.status(404).send('No se encontró recetas con ese id')
        }
    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};





// const postRecipes = async (req, res) =>{
//     try {
//         const { name, image, summary, healthScore, analyzedInstructions } = req.body;

//         let recipeCreated = await Recipe.create ({
//             name,
//             image,
//             summary,
//             healthScore,
//             analyzedInstructions,
//         })  
//         let dietsDb = await Diet.findAll({
//             where: { name }
//         }) 
//         recipeCreated.addDiet(dietsDb)
//         res.status(200).send('Receta creada con exito')     

//     } catch (error) {
//         res.status(400).json({error: error.message}) 
//     }
// };

// let createRecipe = async (name, summary, image, healthScore, analyzedInstructions, diets) => {
//     let [newRecipe, created] = await Recipe.findOrCreate({
//       where: {
//         title: {
//           [Op.iLike]: `%${name}`,
//         },
//       },
//       defaults: {
//         name,
//         summary,
//         image,
//         healthScore,
//         analyzedInstructions,
//       },
//     });
//     if (!created) {
//       throw new Error("La receta ya existe en la base de datos");
//     }
//     let dietByBd = await Diets.findAll({
//       where: {
//         diets: diets,
//       },
//     });
//     await newRecipe.addDiets(dietByBd);
//     return newRecipe;
//   };






// const postRecipes = async (req, res) => {
//   const { name,summary,healthScore,analyzedInstructions,image } = req.body;

//   if (!name || !summary) throw new Error('The "Name" or "Summary" data was not received correctly...');
//   else {
//     try {
//       const recipe = await Recipe.findOne({
//        where: {
//           name
//        }
//       });
//       if(recipe){
//         throw new Error('receta ya creada');
//       }
//       const newRecipe = await Recipe.create({
//         name,
//         image,
//         summary,
//         healthScore,
//         analyzedInstructions,
//       })
//        res.status(200).json(newRecipe)
//     } catch (error) {
//       res.status(404).send(error);

//     }

//   }

// };



const createRecipe = async(name, summary, healthScore, analyzedInstructions, dietsID, image) =>{
    
 
  
  const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      analyzedInstructions,
      image
  })

  await newRecipe.setDiets(dietsID);

  const createdRecipe = await Recipe.findByPk(newRecipe.id, {
      include: {
          model: Diet,
          attributes: ['name'],
          through: {
              attributes: []
          }
      }
  });

  return createdRecipe;
}


const postRecipes = async (req, res) => {
  const {name, summary, healthScore, analyzedInstructions, dietsID, image} = req.body;
  if (!name || !summary  || !image || !dietsID){
      throw new Error('MANDA TODOS LOS PARAMETROS!');
  }
  
  try {
      const newRecipe = await createRecipe(name, summary, healthScore, analyzedInstructions, dietsID, image)
      console.log('se posteo la receta');
      return res.status(200).json(newRecipe);
  }
  catch (error) {
      return res.status(400).send({error: error.message});
  }
};





module.exports = {
    getRecipeById,
    getRecipesByName,
    postRecipes
};



// {
//   "name":"francssus",
//   "image":"franscussss",
//   "summary":"receta satipica del gran francus",
//   "healthScore":10,
//   "analyzedInstructions":"se cocisana a fuego lento el francus",
//   "dietsID"
//   }




// {
//   "dietsID": "02bce342-61bd-4d42-a0dd-fa48650b0d34",
//   "name": "gluten free"
// },
// {
//   "dietsID": "4b2df53f-d770-4e1c-8cb5-a0a4ad38a848",
//   "name": "dairy free"
// },