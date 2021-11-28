import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import usePetModal from '../../hooks/usePetModal';
import { Pet, User } from '../../types';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

import * as S from '../../styles/pages/home/styles';
import { AsideMenu } from '../../components/AsideMenu';
import getApiClient from '../../services/axios';
import { PetModal } from '../../components/PetModal';
// import { TutorialModal } from '../../components/TutorialModal';

interface HomeProps {
  user: User;
  pets: Pet[];
  dontShowTutorial: boolean;
}

export const Home = ({ user, pets, dontShowTutorial }: HomeProps) => {
  const { isOpen } = usePetModal();

  return (
    <S.HomeContainer>
      <Head>
        <title>Home | Achapet</title>
      </Head>
      <AsideMenu />
      <div>
        <Map pets={pets} user={user} />
        <PetModal />
        {/* <TutorialModal dontShowTutorial={dontShowTutorial} /> */}
      </div>
    </S.HomeContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['achapet.user']: user } = parseCookies(ctx);
  const { ['achapet.dontShowTutorial']: dontShowTutorial } = parseCookies(ctx);

  const api = getApiClient(ctx);

  // console.log(process.env.MAPS_API_KEY);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { data } = await api.get('/postsAnimals/list');

  const treatedData = data.map(pet => {
    if (!pet.status) {
      pet.status = 'perdido';
    }

    if (!pet.fotos) {
      return { ...pet, fotos: [] };
    }

    if (typeof pet.fotos[0] == 'string') {
      const fotos = pet.fotos[0].split(',').map(url => {
        return { url };
      });

      return { ...pet, fotos };
    }

    return pet;
  });

  console.log(treatedData);

  return {
    props: {
      user: JSON.parse(user),
      pets: treatedData,
      dontShowTutorial: dontShowTutorial === 'true',
    },
  };
};

export default Home;
