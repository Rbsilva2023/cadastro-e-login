import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { api } from '../../api/Cadastro';
import { Contexto } from '../../context/Context';
import ErrorPage from '../ErrorPage/ErrorPage';
 
import TechList from '../../components/TechList/TechList';
const Home = () => {
  const [profile, setProfile] = useState([]);
  const tokenUser = localStorage.getItem('token');
  const { setIsAuth } = useContext(Contexto);

  const getProfileUserByToken = async () => {
    if (localStorage.getItem('auth') === 'false') return;
    try {
      const response = await api.get('profile', {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });

      setProfile(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  useEffect(() => {
    getProfileUserByToken();
  }, []);

  return (
    <>
      {localStorage.getItem('auth') === 'true' ? (
        <>
          <header className={styles.header}>
            <div className={styles.containerLogo_Logout}>
              <Link to="/home" className={styles.logo}>
                Kenzie Hub
              </Link>
              <Link onClick={() => logout()} to="/" className={styles.logout}>
                Sair
              </Link>
            </div>
          </header>
          <main className={styles.main}>
            <section className={styles.section}>
              <div className={styles.container_name_module}>
                <h1 className={styles.welcome}>Olá, {profile.name}</h1>
                <p className={styles.module}>{profile.course_module}</p>
              </div>
            </section>
            <div className={styles.borda}></div>
            <section className={styles.section2}>
              <div className={styles.container_content_notfound}>
                <TechList />
              </div>
            </section>
          </main>
        </>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default Home;
