import { useState, useEffect } from 'react';
import { LocationInfo, Pet } from '../../../types';
import reverseGeocode from 'latlng-to-zip';
import { useMapEvents } from 'react-leaflet';

import * as S from './styles';
import axios from 'axios';

interface SearchPetCardProps {
  pet: Pet;
}

export default function SearchPetCard({ pet }: SearchPetCardProps) {
  const [petLocationInfo, setPetLocationInfo] = useState<LocationInfo>();

  const map = useMapEvents({});

  useEffect(() => {
    if (!pet) return;

    const { latitude, longitude } = pet;

    reverseGeocode(
      { latitude, longitude },
      process.env.NEXT_PUBLIC_MAPS_API_KEY,
    )
      .then(cep => {
        axios
          .get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
          .then(response => setPetLocationInfo(response.data));
      })
      .catch(err => console.log(err));
  }, []);

  function goToPet() {
    const { latitude, longitude } = pet;

    map.flyTo({ lat: parseFloat(latitude), lng: parseFloat(longitude) }, 18);
  }

  return (
    <S.Container status={pet.status} onClick={goToPet}>
      <figure>
        {pet.fotos[0]?.url && <img src={pet.fotos[0]?.url} alt="" />}
      </figure>
      <div className="pet-info">
        <span>{pet.status || 'perdido'}</span>
        <h4>{pet.nomeAnimal}</h4>
        <p>
          ({pet.raca} / {pet.cor})
        </p>
      </div>
      {petLocationInfo && (
        <div className="location-info">
          <h5>{petLocationInfo.city}</h5>
          <p>
            <div>{petLocationInfo.street},</div>
            <div>{petLocationInfo.neighborhood}</div>
          </p>
        </div>
      )}
    </S.Container>
  );
}
