import React from 'react';
import style from './Loading.module.css';
import loadingGif from '../../assets/34338d26023e5515f6cc8969aa027bca_w200.gif';

const Loading = () => {
  return (
    <div className={style.loadContainer}>
      <div className={style.loadingBackground} />
      <img className={style.load} src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default Loading;
