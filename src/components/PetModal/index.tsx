import { useEffect, useState } from 'react';
import usePetModal from '../../hooks/usePetModal';
import useAuth from '../../hooks/useAuth';
import { FiX } from 'react-icons/fi';
import reverseGeocode from 'latlng-to-zip';
import axios from 'axios';

import { theme } from '../../styles';
import * as S from './styles';
import { PetGallery } from './PetGallery';
import { LocationInfo } from '../../types';
import { RemovePet } from './RemovePet';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const PetModal = () => {
  const [petLocationInfo, setPetLocationInfo] = useState<LocationInfo>();

  const { isOpen, toggleModal, pet } = usePetModal();
  const { user } = useAuth();

  useEffect(() => {
    if (!pet) return;

    const { latitude, longitude } = pet;

    reverseGeocode(
      { latitude, longitude },
      process.env.NEXT_PUBLIC_MAPS_API_KEY,
    )
      .then(cep => {
        const cepValid = cep.replace('');
        axios
          .get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
          .then(response => setPetLocationInfo(response.data))
          .catch(error => console.log('error :>> ', error));
      })
      .catch(err => console.log(err));
  }, [pet]);

  function remove() {
    toast.promise(
      api.delete('/postsAnimals/deletePostsAnimals', {
        data: {
          id: pet.id,
          email: user.email,
          tipo: pet.status === 'achado' ? 'achados' : 'perdidos',
        },
      }),
      {
        loading: 'Um segundo...',
        success: data => {
          location.reload();
          return `Pet removido!`;
        },
        error: err => `Não foi possivel logar`,
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

  if (pet && user) {
    return (
      <S.PetModal isOpen={isOpen}>
        <PetGallery images={pet.fotos} description={pet.caracteristicas} />

        <S.PetInfo className="info">
          <div className="close" onClick={toggleModal}>
            <FiX color={theme.color.text} size={24} />
          </div>

          <div className="infoHeader">
            <div className="petInfo">
              <span>{pet.status || 'perdido'}</span>
              <h1>{pet.nomeAnimal}</h1>
              <p>
                ({pet.raca} / {pet.cor})
              </p>
            </div>
            <div className="locationInfo">
              {petLocationInfo ? (
                <>
                  <h3>
                    {petLocationInfo.city} - {petLocationInfo.state}
                  </h3>
                  <p>
                    <span>{petLocationInfo.street}, </span>
                    <span>{petLocationInfo.neighborhood}</span>
                  </p>
                </>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="description">
            <h3>Sobre o pet:</h3>
            <p>{pet.caracteristicas}</p>
          </div>

          <div className="buttonContainer">
            {pet.email !== user.email ? (
              <>
                {pet.celular && (
                  <a
                    href={
                      pet.status === 'perdido'
                        ? `https://api.whatsapp.com/send?phone=${pet.celular}&text=Ol%C3%A1%2C%20acho%20que%20voc%C3%AA%20viu%20um%20pet%20seu!`
                        : `https://api.whatsapp.com/send?phone=${pet.celular}&text=Ol%C3%A1%2C%20acho%20que%20voc%C3%AA%20viu%20um%20pet%20meu!`
                    }
                    target="_blank"
                    className="whatsapp"
                  >
                    {pet.status === 'perdido'
                      ? 'Eu vi esse pet'
                      : 'Esse é o meu pet'}
                  </a>
                )}
              </>
            ) : (
              <RemovePet
                message={
                  pet.status === 'perdido' ? 'Achei meu pet' : 'Remover pet'
                }
                onRemove={remove}
              />
            )}
          </div>
        </S.PetInfo>
      </S.PetModal>
    );
  }

  return <div></div>;
};
