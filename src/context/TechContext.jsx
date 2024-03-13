import React, { createContext, useEffect, useState } from 'react';
import { api } from '../api/Cadastro';

export const TechContexto = createContext();

const TechContext = ({ children }) => {
  const [list, setList] = useState();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const getToken = (token) => {
    setToken(token);
  };
  const getProfile = async () => {
    try {
      const userResponse = await api.get('profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setList(userResponse.data.techs);
      return userResponse;
    } catch (error) {
      console.error(error);
    }
  };

  const createCard = async (formData) => {
    if (!formData.title) return;
    try {
      const responseAdicion = await api.post('users/techs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getProfile();
      return responseAdicion;
    } catch (error) {
      return error;
    }
  };

  const deleteCard = async (id) => {
    if (!id) return;
    try {
      const deleteCardResponse = await api.delete(`users/techs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getProfile();
      return deleteCardResponse;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const editCard = async (id, formdata) => {
    try {
      const editCardResponse = await api.put(`users/techs/${id}`, formdata, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getProfile();
      return editCardResponse;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);
  return (
    <TechContexto.Provider
      value={{ list, createCard, deleteCard, editCard, getProfile, getToken }}
    >
      {children}
    </TechContexto.Provider>
  );
};

export default TechContext;
