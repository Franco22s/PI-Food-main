// import style from './Detail.module.css'
import * as actions from  '../../Redux/actions.js'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Detail = () =>{

    const dispatch = useDispatch();
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const details = useSelector(state => state.details);

  useEffect(() => {
    dispatch(actions.getRecipesDetails(id));
    console.log(dispatch);
  }, [id, dispatch]);


  useEffect(() => {
    setRecipe(details);
  }, [details]);

  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }

    return (
        <div>
            {recipe.image ? <img src={recipe.image} alt="recipe" /> : null}
            {recipe.id ? <h4>id: {recipe.id}</h4> : null}
            {recipe.name ? <h4>Name: {recipe.name}</h4> : null}
            {recipe.healthScore ? <h4>healthScore: {recipe.healthScore}</h4> : null}
            {recipe.summary ? <h4>summary: {stripHtmlTags(recipe.summary)}</h4> : null}
            {recipe.analyzedInstructions ? <h4>analyzedInstructions: {recipe.analyzedInstructions}</h4> : null}
            {recipe.diets ? <h4>diets: {recipe.diets.join(", ")}</h4> : null}
            <NavLink to={'/home'}>
            <button>Back to home</button>
        </NavLink>
        </div>
    )
}

 
export default Detail



