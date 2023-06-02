import style from './LandingPage.module.css'
import { NavLink } from 'react-router-dom';

const LandingPage = () =>{
    return (
        <div className={style.background}>
            <div className={style.cuadro}>
                <h1 className={style.welcome}> Bienvenidos! </h1>
                <h2>Busca tu receta favorita</h2>
                <NavLink to='/home'>
                    <button className={style.home}>HOME</button>
                </NavLink>
            </div>    
        </div>
    )
};


export default LandingPage;