// import style from './SearchBar.module.css'
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
        dispatch(actions.filterByName(trimmedName));
        setName("");
      }


    return (
        <div>
            <nav>
                <input type="text" placeholder="Search a recipe..."  onChange={handlerChange}/>
                <button onClick={handleSubmit}>🔎</button>
            <NavLink to='/'>
                <button>Create Recipe</button>
            </NavLink>
            </nav>
                <div>
                    <Pagination/> 
                </div>
        </div>        

    )
}



export default SearchBar