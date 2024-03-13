import React, { useContext } from 'react';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../components/Input/formSchema';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Contexto } from '../../context/Context';

const Register = () => {
  const { registerCamp } = useContext(Contexto);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const submit = async (formdata) => {
    const varRegister = await registerCamp(formdata);
    if (varRegister) setTimeout(() => navigate('/'), 2000);
  };
  return (
    <div className={styles.containerRegister}>
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
      <div className={styles.logoAndBtnBack}>
        <h1 className={styles.logo}>Kenzie Hub</h1>
        <button className={styles.btnBack}>
          <Link to="/">Voltar</Link>
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div className={styles.crieSuaConta}>
          <h1>Crie sua conta</h1>
          <p>Rápido e grátis, vamos nessa</p>
        </div>
        <Input
          placeholderInput="Digite aqui seu nome"
          typeInput="text"
          label="Nome"
          {...register('name')}
          error={errors.name}
        />
        <Input
          placeholderInput="Digite aqui seu email"
          typeInput="email"
          label="Email"
          {...register('email')}
          error={errors.email}
        />
        <Input
          placeholderInput="Digite aqui sua senha"
          typeInput="password"
          label="Senha"
          {...register('password')}
          error={errors.password}
        />
        <Input
          placeholderInput="Digite novamnete sua senha"
          typeInput="password"
          label="Confirmar senha"
          {...register('confirmpassword')}
          error={errors.confirmpassword}
        />
        <Input
          placeholderInput="Fale sobre você"
          typeInput="text"
          label="Bio"
          {...register('bio')}
          error={errors.bio}
        />
        <Input
          placeholderInput="Opção de contato"
          typeInput="number"
          label="Contato"
          {...register('contact')}
          error={errors.contact}
        />
        <label className={styles.labelContainerSelect}>
          <span>Selecionar módulo</span>
          <select
            name="modulo"
            id="modulo"
            {...register('course_module')}
            error={errors.course_module}
          >
            <option value="Primeiro módulo (Introdução ao Frontend)">
              Primeiro módulo (Introdução ao Frontend)
            </option>
            <option value="Segundo módulo (Frontend Avançado)">
              Segundo módulo (Frontend Avançado)
            </option>
            <option value="Terceiro módulo (Introdução ao Backend)">
              Terceiro módulo (Introdução ao Backend)
            </option>
            <option value="Quarto módulo (Backend Avançado)">
              Quarto módulo (Backend Avançado)
            </option>
          </select>
        </label>
        <button className={styles.cadastrar} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
