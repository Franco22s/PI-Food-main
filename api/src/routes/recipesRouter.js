const recipesRouter = require('express').Router();
const {getRecipeById, getRecipesByName, postRecipes} = require('../controllers/controllersRecipes')
// createRecipe


recipesRouter.get('/', getRecipesByName)
recipesRouter.get('/:id', getRecipeById)
recipesRouter.post('/', postRecipes)









// async (req, res) =>{
//     try {
//         let { 
//             name,
//             image,
//             summary,
//             healthScore,
//             analyzedInstructions,
//             diets
//          } = req.body;

//         let recipeCreated = await Recipes.create({
//             name,
//             image,
//             summary,
//             healthScore,
//             analyzedInstructions,
//         })  
//         let dietsDb = await Diets.findAll({
//             where: { name: diets }
//         }) 
//         recipeCreated.addDiets(dietsDb)
//         res.send('Receta creada con exito')     

//     } catch (error) {
//         res.status(400).json({error: error.message}) 
//     }
// });





// async (req, res) => {
//     const { name, summary, image, healthScore, analyzedInstructions, diets} = req.body;
  
//     if (!name || !summary) {
//       res.status(404).send('The "Name" or "Summary" data was not received correctly...');
  
//     }
//     else {
//     try {
  
//         const recipeCreated = await Recipes.create({
//             name, summary, image, healthScore, analyzedInstructions
//         });
  
//         const dietDB = await Diets.findAll({
//           where: {
//             name: diets,
//           },
//         });
  
//         recipeCreated.addDiets(dietDB);
//         res.json({ message: 'The recipe was succesfully created', recipeCreated: recipeCreated });
  
//       } catch (error) {
//         res.status(404).send(error.message);
//       }
//     }
//   });











// (async (req, res) => {
//     const { name, summary, image, healthScore, analyzedInstructions, diets } = req.body;
//     try {
//       await createRecipe(name, summary, image, healthScore, analyzedInstructions, diets);
//       res.status(200).send("Recipe has been created successfully");
//     } catch (error) {
//       console.error("Error al crear la receta:", error);
//       res
//         .status(400)
//         .send(
//           "Hubo un problema al crear la receta. Por favor, inténtalo de nuevo."
//         );
//     }
//   });
  



module.exports = recipesRouter;

