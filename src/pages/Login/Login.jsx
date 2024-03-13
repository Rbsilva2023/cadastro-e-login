import React, { useContext, useEffect, useState } from 'react';
import styles from './Login.module.scss';
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { Contexto } from '../../context/Context';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setIsAuth, error, login } = useContext(Contexto);

  const submit = async (formdata) => {
    const loginVar = await login(formdata);
    if (loginVar) setTimeout(() => navigate('/home'), 2000);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
      navigate('/home');
      return;
    }
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className={styles.logo}>Kenzie Hub</h1>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div className={styles.container_title}>
          <h1 className={styles.title}>Login</h1>
        </div>
        <Input
          typeInput="email"
          label="Email"
          placeholderInput="Insira o seu e-mail"
          {...register('email')}
        />

        <Input
          typeInput="password"
          label="Senha"
          placeholderInput="Insira a sua senha"
          {...register('password')}
        />
        {error ? (
          <span className={styles.erro}>Email ou senha inválidos</span>
        ) : null}

        <button className={styles.submit} type="submit">
          Entrar
        </button>
        <div className={styles.cadastro}>
          <p>Ainda não possui uma conta?</p>
          <button className={styles.register}>
            <Link to="register">Registre-se</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
