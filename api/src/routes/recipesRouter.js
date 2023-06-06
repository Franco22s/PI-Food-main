const recipesRouter = require('express').Router();
const {getRecipeById, getRecipesByName, postRecipes} = require('../controllers/controllersRecipes')



recipesRouter.get('/', getRecipesByName)
recipesRouter.get('/:id', getRecipeById)
recipesRouter.post('/', postRecipes)








  



module.exports = recipesRouter;

