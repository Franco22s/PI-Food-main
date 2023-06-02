import style from './HomePage.module.css'
import Cards from '../Cards/Cards';
// import { useDispatch} from "react-redux";
// import * as actions from '../../Redux/actions';
// import { useEffect} from "react";
import Lateral from '../Lateral/Lateral';
import SearchBar from '../SearchBar/SearchBar';

const HomePage= () => {
    // const dispatch = useDispatch(); 
    // useEffect(() => {
    //     dispatch(actions.getRecipes());
    //   }, []);
    
    return (
        <div className={style.fondo}>
            <header className={style.head}>
            <SearchBar></SearchBar>
            </header>
            <aside className={style.lateral}>
            <Lateral></Lateral>
            </aside>
            <div className={style.body}> 
                <Cards></Cards>
            </div>
            
        </div>

    )
};


export default HomePage;