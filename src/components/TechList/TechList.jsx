import React, { useState, useContext, useEffect } from 'react';
import styles from './TechList.module.scss';
import TechCard from './TechCard/TechCard';
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import { TechContexto } from '../../context/TechContext';
import { ToastContainer, toast } from 'react-toastify';
const createSucefully = () => toast.success('Criado com sucesso!');
const createError = () =>
  toast.error('Não é possível adicionar duas tecnologias com o mesmo nome.');
const deleteSucefully = () => toast.success('Deletado com sucesso!');

const TechList = () => {
  const [modal, setModal] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const { list, createCard, deleteCard, editCard, getToken } =
    useContext(TechContexto);
  const submit = async (formdata) => {
    const { status } = await createCard(formdata);

    setModal(false);

    if (status === 201) {
      setValue('title', '');
      return createSucefully();
    } else {
      return createError();
    }
  };

  const closeAndOpenModal = () => {
    setModal(!modal);
  };

  const deletar = (id, formData) => {
    editCard(id, formData);
  };
  useEffect(() => {
    getToken(localStorage.getItem('token'));
  }, []);
  return (
    <div className={styles.container_List}>
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
      <div className={styles.container_Tech_and_BtnAdd}>
        <h1>Tecnologias</h1>
        <button onClick={closeAndOpenModal} className={styles.addBtn}>
          +
        </button>
      </div>
      {list && !list.length == 0 ? (
        <div className={styles.container_TechList}>
          {list &&
            list.map((tec) => (
              <div key={tec.id}>
                <TechCard
                  id={tec.id}
                  onDelete={() => deleteCard(tec.id)}
                  onEdit={(id, formData) => deletar(id, formData)}
                  nameTec={tec.title}
                  status={tec.status}
                />
              </div>
            ))}
        </div>
      ) : null}

      {modal && (
        <div className={styles.modal}>
          <div className={styles.titleAndCloseBtn}>
            <h3>Cadastrar Tecnologia</h3>
            <button onClick={closeAndOpenModal}>X</button>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <Input
              typeInput="text"
              placeholderInput="Name"
              label="Nome"
              {...register('title')}
            />

            <label className={styles.labelContainerSelect}>
              <span>Selecionar Status</span>
              <select name="status" id="status" {...register('status')}>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </label>
            <button className={styles.createTechnologie} type="submit">
              Cadastrar Tecnologia
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TechList;
