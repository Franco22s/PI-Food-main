import style from './Lateral.module.css';
import * as actions from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Lateral = () => {
  const dispatch = useDispatch();
  const [dietOptions, setDietOptions] = useState([]);

  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);

  const handleOrderByName = (e) => {
    dispatch(actions.orderByName(e.target.value));
  };

  const handleOrderByHealthScore = (e) => {
    dispatch(actions.orderByHealthScore(e.target.value));
  };

  const filterByDiets = (e) => {
    dispatch(actions.filterByDiet(e.target.value));
  };

  const filterByOrigin = (e) => {
    const selectedOption = e.target.value;
    dispatch(actions.filterByOrigin(selectedOption));
  };

  const diets = useSelector((state) => state.diets); 

  useEffect(() => {
    setDietOptions(diets.map((diet) => diet.name)); 
  }, [diets]);

  return (
    <div className={style.selectContainer}>
      <div>
        <ul>
          <li>
            <h2>Filter by Origin</h2>
            <select name="Filter by Origin" id="FilterByOrigin" onChange={filterByOrigin}>
            <option value="">All recipes</option>
              <option value="DataBase">DataBase</option>
              <option value="Api">Api</option>
            </select>
          </li>
          <li>
            <h2>Order by Name</h2>
            <select name="Order by Name" id="OrderByName" onChange={handleOrderByName}>
              <option value="">click here</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </li>
          <li>
            <h2>Order by Health Score</h2>
            <select name="Order by Health Score" id="OrderByHealthScore" onChange={handleOrderByHealthScore}>
              <option value="">click here</option>
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
            </select>
          </li>
          <li>
            <h2>Filter by Diets</h2>
            <select name="Filter by Diets" id="FilterByDiets" onChange={filterByDiets}>
              <option value="all">All Diets</option>
              {dietOptions.map((diet, index) => (
                <option value={diet} key={index}>
                  {diet}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Lateral;
