import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from 'react-leaflet';

import PetMarker from './PetMarker';
import { ModalPet } from '../../components/index';

import 'leaflet/dist/leaflet.css';
import { Pet, User } from '../../types';
import SearchPet from '../SearchPet';
import useSearch from '../../hooks/useSearch';

interface HomeProps {
  user: User;
  pets: Pet[];
}

const Map = ({ pets, user }: HomeProps) => {
  const [position, setPosition] = useState<number[]>();
  const [hasUserLocation, setHasUserLocation] = useState<boolean>(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      location => {
        const { latitude, longitude } = location.coords;

        setHasUserLocation(true);
        setPosition([latitude, longitude]);
      },
      () => {
        setHasUserLocation(false);
        setPosition([-13.8013697, -50.9061335]);
      },
    );
  }, []);

  return (
    <>
      {position ? (
        <MapContainer
          center={[position[0], position[1]]}
          zoom={hasUserLocation ? 16 : 5}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
          />
          {pets.map(pet => (
            <PetMarker key={pet.id} pet={pet} />
          ))}

          <SearchPet pets={pets} />
          <LocationMarker user={user} />
        </MapContainer>
      ) : (
        ''
      )}
    </>
  );
};

function LocationMarker({ user }: { user: User }) {
  const [clickPosition, setClickPosition] = useState(null);
  const [params, setParams] = useState(null);

  useMapEvent('click', event => {
    setParams(event.latlng);
    setClickPosition(event.latlng);
    console.log('event :>> ', event);
  });

  return clickPosition === null ? null : (
    <Marker position={clickPosition}>
      <ModalPet
        latlng={params}
        clearPosition={() => {
          setClickPosition(null);
        }}
        user={user}
      ></ModalPet>
    </Marker>
  );
}

export default Map;
