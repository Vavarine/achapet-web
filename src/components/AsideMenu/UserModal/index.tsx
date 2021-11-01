import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react';
import { FiEdit, FiUser, FiLogOut, FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import { User, UserPhoto } from '../../../types';
import { theme } from '../../../styles';
import useAuth from '../../../hooks/useAuth';
import api from '../../../services/api';
import * as S from './styles';
import toast from 'react-hot-toast';
import axios from 'axios';

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserModal = ({ isOpen, setIsOpen }: UserModalProps) => {
  const { user, logOut, refreshUserData, authUser } = useAuth();
  const [userPhoto, setUserPhoto] = useState<UserPhoto>();
  const fileInputRef = useRef<HTMLInputElement>();

  const {
    register,
    setError,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      console.log(user);

      setUserPhoto(user.photo);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('cellphone', user.cellphone);
    }
  }, [user]);

  async function onSubmit(data) {
    console.log(userPhoto.url !== user.photo.url);
    if (userPhoto.url !== user.photo.url) {
      await toast.promise(
        sendUserPhoto(),
        {
          loading: 'Enviado imagem...',
          success: data => {
            return `Imagem salva!`;
          },
          error: err => `Não foi possivel enviar a imagem`,
        },
        {
          success: {
            icon: '🐶',
          },
          error: {
            icon: '😓',
          },
        },
      );
    }

    if (
      (data.name !== user.name ||
        data.email !== user.email ||
        data.cellphone !== user.cellphone ||
        data.newPassword !== '') &&
      data.password === ''
    ) {
      toast(
        'Você deve informar sua senha atual para modificar os dados pessoais!',
        { icon: '😅' },
      );
    } else {
      toast.promise(
        sendUserData(data),
        {
          loading: 'Eviando dados...',
          success: data => {
            return `dados salvos!`;
          },
          error: err => `Não foi possivel enviar seus dados`,
        },
        {
          success: {
            icon: '🐈',
          },
          error: {
            icon: '😓',
          },
        },
      );
    }

    refreshUserData(user.email, data.password);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('image changed');
    if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    setUserPhoto({ url: URL.createObjectURL(file) });
  }

  function handleImageRemove() {
    setTimeout(() => {
      setUserPhoto(user.photo);
      fileInputRef.current.value = '';
    }, 100);
  }

  async function sendUserData(data: any) {
    console.log('data from form', data);

    try {
      await authUser(user.email, data.password);
    } catch {
      console.log('dados não conferem');
      toast.error('A sua senha atual não é essa');
      throw new Error('User data not valid');
    }

    const newData = {
      nome: data.name,
      email: data.email,
      celular: data.cellphone,
    };

    if (data.newPassword === '') {
      try {
        console.log('dados alterados sem senha');

        console.log(newData);

        const { data } = await api('/users/updateUser', {
          method: 'PUT',
          data: newData,
        });

        console.log('data returned from  put', data);
      } catch (err) {
        console.log(err);
        toast.error('Não foi possivel atualizar os seus dados');
        throw new Error('User data was not send');
      }

      return;
    }

    if (data.newPassword !== data.repeatNewPassword) {
      toast.error('A sua nova senha não confere');
      throw new Error('New password don´t check');
    }

    const newDataWithPassword = {
      nome: data.name,
      email: data.email,
      celular: data.cellphone,
      senha: data.password,
    };

    try {
      console.log('dados alterados com senha');

      await api('/users/updateUser', {
        method: 'PUT',
        data: newDataWithPassword,
      });
    } catch (err) {
      console.log(err);
      toast.error('Não foi possivel atualizar os seus dados');
      throw new Error('User data was not send');
    }
  }

  async function sendUserPhoto() {
    const imageData = new FormData();
    imageData.append('email', user.email);
    imageData.append('file', fileInputRef.current.files[0]);

    const { data } = await api('/users/putFoto', {
      method: 'PUT',
      data: imageData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  if (user) {
    return (
      <S.UserModal isOpen={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.UserPhoto>
            <h3 className="title">Edite suas informações</h3>
            <figure>
              {userPhoto?.url === user?.photo?.url ? (
                <label className="edit" htmlFor="photo">
                  <FiEdit />
                </label>
              ) : (
                <label className="remove" onClick={handleImageRemove}>
                  <FiX />
                </label>
              )}
              <div className="image-container">
                {userPhoto?.url?.includes('undefined') ? (
                  <FiUser />
                ) : (
                  <img src={userPhoto?.url} />
                )}
              </div>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </figure>
          </S.UserPhoto>
          <S.InputsContainers>
            <div className="inputs-container">
              <div className="input-wrapper">
                <label htmlFor="name">Seu nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register('name')}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="email">Seu email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register('email')}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="cellphone">Seu número de celular</label>
                <input
                  type="text"
                  name="cellphone"
                  id="cellphone"
                  maxLength={11}
                  minLength={9}
                  onChange={e => {
                    e.target.value = e.target.value.replace(/[^\d]/, '');
                  }}
                  {...register('cellphone')}
                  required
                />
              </div>
            </div>
            <span className="divisor"></span>
            <div className="inputs-container">
              <div className="input-wrapper">
                <label htmlFor="password">Sua senha atual</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register('password')}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="newPassword">Nova senha</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  {...register('newPassword')}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="name">Repita a nova senha</label>
                <input
                  type="password"
                  name="repeatNewPassword"
                  id="repeatNewPassword"
                  {...register('repeatNewPassword')}
                />
              </div>
            </div>
          </S.InputsContainers>
          <S.ButtonsContainer>
            <button className="logout" type="button" onClick={logOut}>
              sair da conta
              <FiLogOut />
            </button>
            <button
              className="cancel"
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Deixa pra lá
            </button>
            <button className="submit" type="submit">
              é isso!
            </button>
          </S.ButtonsContainer>
        </form>
      </S.UserModal>
    );
  }

  return <div></div>;
};
