import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../api/Cadastro';
const loginSucefull = () => toast.success('Sucesso!');
const loginFail = () =>
  toast.error('Ops, algo deu errado! Tente novamente mais tarde.');
const registerSucefull = () => toast.success('Registrado com sucesso!');
const registerFail = () =>
  toast.error('Ops, algo deu errado! Tente novamente mais tarde.');

export const Contexto = createContext();

const Context = ({ children }) => {
  const [error, setError] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage.getItem('auth') || false);
  const localStorageAuth = localStorage.setItem('auth', isAuth);

  const login = async (formdata) => {
    try {
      const response = await api.post('sessions', formdata);
      loginSucefull();
      localStorage.setItem('token', response.data.token);
      setError(false);
      setIsAuth(true);
      return response.data;
    } catch (error) {
      setError(true);
      console.error(error.message);
      loginFail();
      return null;
    }
  };

  const registerCamp = async (formdata) => {
    try {
      const response = await api.post('users', formdata);
      registerSucefull();
      return response;
    } catch (error) {
      console.error(error);
      registerFail();
      return null;
    }
  };
  return (
    <Contexto.Provider
      value={{ isAuth, setIsAuth, login, registerCamp, error }}
    >
      {children}
    </Contexto.Provider>
  );
};

export default Context;
