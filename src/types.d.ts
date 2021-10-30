export interface InstitutionalContent {
  slug: string;
  title: string;
  text: string;
}

export interface User {
  name: string;
  email: string;
}
export interface Foto {
  idFoto: number;
  nomeFoto: string;
  tamanho: number;
  key: string;
  url: string;
}
export interface Pet {
  id: number;
  email: string;
  nome: string;
  celular: string;
  status: 'perdido' | 'visto';
  nomeAnimal: string;
  animalTipo: null;
  raca: string;
  cor: string;
  caracteristicas: string;
  hora: string;
  data: string;
  latitude: string;
  longitude: string;
  fotos: Foto[];
}

// Generated by https://quicktype.io

export interface LocationInfo {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: Location;
}

export interface Location {
  type: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  longitude: string;
  latitude: string;
}