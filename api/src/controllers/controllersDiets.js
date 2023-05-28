const { Diet } = require('../db')
require('dotenv').config();
const {YOUR_API_KEY} = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`;
const axios = require('axios');


const getAllDiets = async(req,res)=>{
  const dietsApi = await axios(URL);
  const dietsDB = dietsApi.data.results
      .map((t) => t.diets) 
      .toString() 
      .split(",") 
      .map((t) => t.trim()) 
      .filter((t) => t.length > 1)
  const filtro = dietsDB.filter((t) => t); 
  let dietsFilt = [...new Set(filtro)]; 

  dietsFilt.forEach((t) => {
      Diet.findOrCreate({ 
          where: { name: t },
      });
  });

  const totaldiets = await Diet.findAll(); 
  res.status(200).json(totaldiets);
}







module.exports = {
    getAllDiets
};


