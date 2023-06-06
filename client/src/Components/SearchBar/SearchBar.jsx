import style from './SearchBar.module.css'
import * as actions from '../../Redux/actions';
import { useDispatch} from "react-redux";
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { NavLink } from 'react-router-dom';


const SearchBar = () => {
    const dispatch = useDispatch();
    
    const [name, setName] = useState("");

    const handlerChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
      const trimmedName = name.trim();
      if (trimmedName === "") {
        return; 
      }
      dispatch(actions.filterByName(trimmedName));
    }



    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }  
    }    

    const handleHomeButtonClick = () => {
      dispatch(actions.getRecipes());
    };


    return (
      <div className={style.universal}>
        <div className={style.heade}>
            <div className={style.homeBut}>
                <button className={style.recipes} onClick={handleHomeButtonClick}>✪ Recipes</button>
            </div>
        <div className={style.searchContainer}>
          <nav>
            <input
              type="text"
              placeholder="Search a recipe..."
              onChange={handlerChange}
              onKeyPress={handleKeyPress}
              className={style.searchInput} 
            />
            <button className={`${style.boton} ${style.searchButton}`} onClick={handleSubmit}>
              Search🔎
            </button>
          </nav>
        </div>
        <div className={style.createBut}>
            <NavLink to="/CreateRecipe">
              <button className={`${style.create} ${style.createButton}`}>Create Recipe</button>
            </NavLink>
        </div>
        </div>    
          <div className={style.pag}>
            <Pagination />
          </div>
      </div>   
      );
    };



export default SearchBar