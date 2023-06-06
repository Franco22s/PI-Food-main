import React, { useState, useEffect } from 'react';
import style from './CreateRecipe.module.css';
import validation from './validation';
import { NavLink,   } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe, getDiets,} from '../../Redux/actions';


const CreateRecipe = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);


  const [recipeData, setRecipeData] = useState({
    name: '',
    summary: '',
    healthScore: 0,
    image: '',
    analyzedInstructions: '',
    diets: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validation({ ...recipeData, [name]: value })[name] || null
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setRecipeData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          diets: [...prevData.diets, value]
        };
      } else {
        return {
          ...prevData,
          diets: prevData.diets.filter((diet) => diet !== value)
        };
      }
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(recipeData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        dispatch(postRecipe(recipeData));
        console.log('Valid data:', recipeData);
        alert('La receta se guardó correctamente');
      } catch (error) {
        console.error('No se pudo crear tu receta:', error);
      }
    }
  };

  return (
    <div className={style.maxContainer}>
      <div className={style.containerWrapper}>
        <div className={style.CContainer}>
          <h1>CREATE RECIPE...</h1>
          <form className={style.formu} onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
              <label className={style.labe} htmlFor="image">
                <input
                  className={style.inpaIma}
                  type="text"
                  name="image"
                  id="image"
                  placeholder="add image"
                  value={recipeData.image}
                  onChange={handleChange}
                />
              </label>
              {recipeData.image && (
                <img
                  className={style.imagePreview}
                  src={recipeData.image}
                  alt="Recipe Preview"
                />
              )}
            </div>
            {errors.image && <span className={style.error}>{errors.image}</span>}

            <label className={style.labe} htmlFor="name">
              <input
                className={style.inpa}
                type="text"
                name="name"
                id="name"
                placeholder="add name"
                value={recipeData.name}
                onChange={handleChange}
              />
            </label>
            {errors.name && <span className={style.error}>{errors.name}</span>}

            <label className={style.labe} htmlFor="summary">
              <textarea
                className={style.inpa}
                type="text"
                name="summary"
                id="summary"
                placeholder="add summary"
                value={recipeData.summary}
                onChange={handleChange}
              />
            </label>
            {errors.summary && <span className={style.error}>{errors.summary}</span>}

            <label className={style.labe} htmlFor="healthScore">
              <input
                className={style.inpaNum}
                type="number"
                name="healthScore"
                id="healthScore"
                placeholder="add health Score"
                value={recipeData.healthScore}
                onChange={handleChange}
              />
            </label>
            {errors.healthScore && <span className={style.error}>{errors.healthScore}</span>}

            <label className={style.labe} htmlFor="analyzedInstructions">
              <textarea
                className={style.inpa}
                type="text"
                name="analyzedInstructions"
                id="analyzedInstructions"
                placeholder="add Instructions"
                value={recipeData.analyzedInstructions}
                onChange={handleChange}
              />
            </label>
            {errors.analyzedInstructions && (
              <span className={style.error}>{errors.analyzedInstructions}</span>
            )}

            <label className={style.labe} htmlFor="diets">
              <span>Select diets:</span>
              {diets.map((diet) => (
                <label key={diet.diets}>
                  <input
                    className={style.inpa}
                    type="checkbox"
                    name="diets"
                    value={diet.diets}
                    checked={recipeData.diets.includes(diet.diets)}
                    onChange={handleCheckboxChange}
                  />
                  {diet.name}
                </label>
              ))}
            </label>
            {errors.diets && <span className={style.error}>{errors.diets}</span>}

            <button className={style.greenButton} type="submit">
              Save
            </button>
          </form>
          <NavLink to={`/home`}>
            <button className={style.redButton}>Back to home</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
