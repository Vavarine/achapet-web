import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiChevronLeft } from 'react-icons/fi';
import { Pet } from '../../types';

import * as S from './styles';
import SearchPetCard from './SearchPetCard';
import Toggle from '../Toggle';
import useSearch from '../../hooks/useSearch';

interface SearchPetsProps {
  pets: Pet[];
}

const SearchPet = ({ pets }: SearchPetsProps) => {
  const { isOpen, setIsOpen } = useSearch();
  const [queriedPetList, setQueriedPetList] = useState(pets);
  const [filteredPetsList, setFilteredList] = useState(pets);
  const [showLost, setShowLost] = useState(true);
  const [showFound, setShowFound] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (isOpen) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    filterPets();
  }, [showLost, showFound, queriedPetList]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPets();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  function searchPets() {
    if (searchTerm === '') {
      setQueriedPetList(pets);
      return;
    }

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

  function filterPets() {
    let filteredPets = queriedPetList.map(pet => ({
      ...pet,
      status: pet.status || 'perdido',
    }));

    if (!showLost) {
      filteredPets = filteredPets.filter(pet => pet.status !== 'perdido');
    }

    if (!showFound) {
      filteredPets = filteredPets.filter(pet => pet.status !== 'achado');
    }

    setFilteredList(filteredPets);
  }

  function stringIncludes(str: string, term: string): boolean {
    const strTreated = str.replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const termTreated = term.replace(/[\u0300-\u036f]/g, '').toLowerCase();

    return strTreated.includes(termTreated);
  }

  return (
    <S.SearchContainer>
      <S.SearchBar open={isOpen}>
        <div className="chevron-wrapper" onClick={() => setIsOpen(!isOpen)}>
          <FiChevronLeft size={26} color="#323232" />
        </div>
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          placeholder="Raça, cor ou tipo"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="search-icon-wrapper" onClick={() => setIsOpen(!isOpen)}>
          <FiSearch size={24} color="#323232" />
        </div>
      </S.SearchBar>
      <S.TogglesContainer open={isOpen}>
        <Toggle
          title="perdidos"
          defaultValue={showLost}
          onChange={setShowLost}
        />
        <Toggle
          title="achados"
          defaultValue={showFound}
          onChange={setShowFound}
        />
      </S.TogglesContainer>
      <S.PetList open={isOpen}>
        {filteredPetsList.map(pet => (
          <SearchPetCard key={pet.id} pet={pet} />
        ))}
      </S.PetList>
    </S.SearchContainer>
  );
};

export default SearchPet;
