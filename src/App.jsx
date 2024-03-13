import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { Contexto } from './context/Context';

const App = () => {
  const { isAuth } = useContext(Contexto);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register /> } />
          <Route path="/home" element={isAuth && <Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
