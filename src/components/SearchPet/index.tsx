import React, { useState, useEffect, useRef } from 'react';

import { FiSearch, FiChevronLeft } from 'react-icons/fi';

import { Pet } from '../../types';

import * as S from './styles';
import SearchPetCard from './SearchPetCard';

interface SearchPetsProps {
  pets: Pet[];
}

const SearchPet = ({ pets }: SearchPetsProps) => {
  const [open, setOpen] = useState(false);
  const [queriedPetList, setQueriedPetList] = useState(pets);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (open) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(searchTerm);

      if (searchTerm !== '') {
        searchPets();
        return;
      }

      setQueriedPetList(pets);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  function searchPets() {
    const queriedPets = pets.filter(pet => {
      return Object.keys(pet).find(key => {
        if (typeof pet[key] === 'string') {
          return stringIncludes(pet[key], searchTerm);
        }

        return false;
      });
    });

    setQueriedPetList(queriedPets);
  }

  function stringIncludes(str: string, term: string): boolean {
    const strTreated = str.replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const termTreated = term.replace(/[\u0300-\u036f]/g, '').toLowerCase();

    return strTreated.includes(termTreated);
  }

  return (
    <S.SearchContainer>
      <S.SearchBar open={open}>
        <div className="chevron-wrapper" onClick={() => setOpen(!open)}>
          <FiChevronLeft size={26} color="#323232" />
        </div>
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          placeholder="Raça, cor, tipo, local..."
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="search-icon-wrapper" onClick={() => setOpen(!open)}>
          <FiSearch size={24} color="#323232" />
        </div>
      </S.SearchBar>
      <S.PetList open={open}>
        {queriedPetList.map(pet => (
          <SearchPetCard key={pet.id} pet={pet} />
        ))}
      </S.PetList>
    </S.SearchContainer>
  );
};

export default SearchPet;
