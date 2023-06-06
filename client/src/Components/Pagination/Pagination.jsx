import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Redux/actions';
import style from './Pagination.module.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const cardsPerPage = 9;
  const totalPages = Math.ceil(filteredRecipes.length / cardsPerPage);
  const currentPage = useSelector((state) => state.currentPage);

  const handleClick = (page) => {
    dispatch(actions.setCurrentPage(page));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(actions.setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };

  return (
    <nav>
      <ul className={style.uele}>
        <li className={style.lis}>
          <button onClick={() => handleClick(1)}>First</button>
        </li>
        <li className={style.lis}>
          <button onClick={handlePrevious}>Previous</button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <li className={style.lis} key={page}>
            <button
              onClick={() => handleClick(page)}
              className={currentPage === page ? style.activePage : ''}
            >
              {page}
            </button>
          </li>
        ))}
        <li className={style.lis}>
          <button onClick={handleNext}>Next</button>
        </li>
        <li className={style.lis}>
          <button onClick={() => handleClick(totalPages)}>Last</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
