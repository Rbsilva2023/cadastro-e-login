import React, { useContext, useEffect } from 'react';
import styles from './Errorpage.module.scss';
import ImageSvg from '../../assets/Hey.svg';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <div className={styles.containerError}>
      <div className={styles.logoAndErrorMsg}>
        <h1 className={styles.logo}>Kenzie Hub</h1>
        <h2 className={styles.titleError}>Registre-se para ter acesso! </h2>
        <Link className={styles.btn_back} to="/">
          Clique aqui para voltar a página de login
        </Link>
      </div>
      <div className={styles.imgAcessoNegado}>
        <img src={ImageSvg} alt="Acesso Negado" />
      </div>
    </div>
  );
};

export default ErrorPage;
