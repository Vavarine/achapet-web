import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';
import api from '../../services/api';
import getUnvalidFields from '../../utils/getUnvalidFields';
import * as S from './styles';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  async function onsubmit(data) {
    const { name, email, cellphone, password } = data;

    if (getUnvalidFields({ name, email, password }).length > 0) {
      toast.error('Preencha todos os campos');
      return;
    }

    toast.promise(
      signIn(name, email, cellphone, password),
      {
        loading: 'Um segundo...',
        success: data => {
          router.push('/login');
          return `Conta criada!`;
        },
        error: err => {
          const status = err.response.status;
          if (status === 400) return 'Esse email já está em uso';

          return 'Não foi possivel fazer o cadastro';
        },
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

  async function signIn(
    name: string,
    email: string,
    cellphone: string,
    password: string,
  ) {
    await api.post('/users/create', {
      nome: name,
      email,
      celular: cellphone,
      senha: password,
    });
  }

  return (
    <S.ContainerLogin>
      <form onSubmit={handleSubmit(onsubmit)}>
        <S.Title>Cadastrar-se</S.Title>

        <S.LoginWithEmailAndPass>
          <label htmlFor="name" {...register('name')}>
            Nome
          </label>
          <input
            name="name"
            type="name"
            id="name"
            {...register('name')}
            required
          ></input>

          <label htmlFor="email" {...register('email')}>
            E-mail
          </label>
          <input
            name="email"
            type="email"
            id="email"
            {...register('email')}
            required
          ></input>
          <span className="errorMessage">Preecha o campo corretamente</span>

          <label htmlFor="password">Número de celular</label>
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
          ></input>

          <label htmlFor="password">Senha</label>
          <input
            name="email"
            type="password"
            id="password"
            {...register('password')}
            required
          ></input>

          <S.AcceptTerms>
            <div>
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                {...register('terms')}
                required
              />
              <label htmlFor="acceptTerms">Aceito os</label>
            </div>
            <div>
              <a href="">Termos e condições</a>
            </div>
          </S.AcceptTerms>

          <S.SubmitButton>
            <button type="submit">Cadastrar</button>
          </S.SubmitButton>
        </S.LoginWithEmailAndPass>
      </form>

      <S.IHaveAccount>
        <span>
          Já tem uma conta?&nbsp;
          <a href="/login">Entrar</a>
        </span>
      </S.IHaveAccount>
    </S.ContainerLogin>
  );
};

export default SignInForm;
