import style from './LandingPage.module.css'
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className={`${style.background} ${style['image-container']}`}>
      <div className={style.letras}>
        <h1 className={style.welcome}>Welcome!</h1>
        <h2>Search for your favorite recipe</h2>
        <div className={`${style['button-container']} button-container`}>
          <NavLink to='/home'>
            <button className={style.home}>HOME</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
