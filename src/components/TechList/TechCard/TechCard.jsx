import React, { useEffect, useState } from 'react';
import styles from './TechCard.module.scss';
import Trash from '../../../assets/delete.svg';
import Edit from '../../../assets/edit.svg';
import { useForm } from 'react-hook-form';
import Input from '../../Input/Input';
import { ToastContainer, toast } from 'react-toastify';

const TechCard = ({ id, status, nameTec, onDelete, onEdit }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [modalEdit, setModalEdit] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const enableAndDisableModalEdit = () => {
    setModalEdit(!modalEdit);
    if (!modalEdit) {
      setInitialValues({ status, nameTec });
    }
  };

  const submit = (formdata) => {
    onEdit(id, formdata);
    setModalEdit(false);
  };

  useEffect(() => {
    setValue('status', initialValues.status);
    setValue('title', initialValues.nameTec);
  }, [initialValues]);

  return (
    <div className={styles.card}>
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
      <h2>{nameTec}</h2>
      <div className={styles.delete_edit}>
        <p>{status}</p>
        <div className={styles.editMobile}>
          <img src={Trash} onClick={onDelete} alt="Delete" />
          <img src={Edit} alt="Edit" onClick={enableAndDisableModalEdit} />
        </div>
      </div>

      {modalEdit && (
        <div className={styles.modal}>
          <div className={styles.titleAndCloseBtn}>
            <h3>Tecnologia Detalhes</h3>
            <button onClick={enableAndDisableModalEdit}>X</button>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <Input
              typeInput="text"
              placeholderInput="Name"
              label="Nome"
              disabled
              value={nameTec}
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
              Salvar alterações
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TechCard;
