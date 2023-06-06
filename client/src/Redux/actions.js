import axios from "axios"
import {GET_RECIPES, GET_DIETS, GET_DETAIL_RECIPES, GET_RECIPES_BY_NAME, FILTER_BY_ORIGIN, FILTER_BY_DIET, ORDER_BY_HEALTH_SCORE, ORDER_BY_NAME, POST_RECIPES, FILTER_BY_NAME, SET_CURRENT_PAGE} from './actionType'

export function getRecipes(){
    return async function (dispatch) {
        try {
            const { data } = await axios.get("http://localhost:3001/recipes");
            if(!data.length) throw new Error("No hay recetas");

            return dispatch({
                type: GET_RECIPES,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};

export function getDiets(){
    return async function (dispatch) {
        try {
            const { data } = await axios.get("http://localhost:3001/diets");
            if(!data.length) throw new Error("No hay dietas");

            return dispatch({
                type: GET_DIETS,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};


export function getRecipesDetails(id){
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`);
            const details = response.data

            return dispatch({
                type: GET_DETAIL_RECIPES,
                payload: details,
            });
        } catch (error) {
            console.log('No se encontraron los detalles', error);
        };
    };
};


export function getRecipesByName(payload){
    return async function(dispatch){
        try {
            const { data } = await axios.get(`http://localhost:3001/recipes?name=${payload}`);
            

            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: data,
            });
        } catch (error) {
           alert('No existe una receta con ese nombre');
        };
    };
};


export function postRecipe(recipe){
    return async function(dispatch){
        try {
            const { data } = await axios.post('http://localhost:3001/recipes', recipe);
            if(!data.length) throw new Error("Hubo un problema en tu posteo");

            return dispatch({
                type: POST_RECIPES,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};



export function filterByOrigin(origin){
    return ({
        type: FILTER_BY_ORIGIN,
        payload: origin,
    });
};


export function filterByDiet(diet){
    return ({
        type: FILTER_BY_DIET,
        payload: diet,
    });
};


export function orderByHealthScore(score){
    return ({
        type: ORDER_BY_HEALTH_SCORE,
        payload: score,
    });
};


export function orderByName(name){
    return ({
        type: ORDER_BY_NAME,
        payload: name,
    });
};

export const filterByName = (name) => {
    return {
      type: FILTER_BY_NAME,
      payload: name,
    };
  };


export const setCurrentPage = (page) => {
    return {
      type: SET_CURRENT_PAGE,
      payload: page,
    };
  };