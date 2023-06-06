import style from './HomePage.module.css'
import Cards from '../Cards/Cards';
import Lateral from '../Lateral/Lateral';
import SearchBar from '../SearchBar/SearchBar';

const HomePage= () => {
    return (
        <div className={style.fondo}>
            <header className={style.head}>
                <SearchBar />
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