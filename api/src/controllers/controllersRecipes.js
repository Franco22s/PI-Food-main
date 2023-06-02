require('dotenv').config();
const {YOUR_API_KEY} = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=90`;
const axios = require('axios');
const {Recipe, Diet} = require('../db')

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
      diets: recipe.diets?.map((diet) => diet.name).join(', '),
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




const createRecipe = async(name, summary, healthScore, analyzedInstructions, diets, image) =>{
    
 
  
  const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      analyzedInstructions,
      image
  })

  await newRecipe.setDiets(diets);

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
  const {name, summary, healthScore, analyzedInstructions, diets, image} = req.body;
  if (!name || !summary  || !image || !diets){
      throw new Error('MANDA TODOS LOS PARAMETROS!');
  }
  
  try {
      const newRecipe = await createRecipe(name, summary, healthScore, analyzedInstructions, diets, image)
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


