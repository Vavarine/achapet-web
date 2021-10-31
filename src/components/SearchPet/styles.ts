import styled from 'styled-components';

import { rem, flexCenter, visible, hidden } from '../../styles/index';

interface SearchPetProps {
  open: boolean;
}

export const SearchContainer = styled.div`
  position: absolute;

  top: 25px;
  right: 25px;
  height: auto;
  width: auto;

  /* background-color: red; */

  z-index: 999;
`;

export const SearchBar = styled.div<SearchPetProps>`
  position: relative;
  height: 50px;
  width: ${props => (props.open ? '385px' : '50px')};

  display: flex;
  align-items: center;

  background-color: rgba(188, 224, 234, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  transition: all 0.4s;

  cursor: default;

  input {
    position: absolute;
    height: 28px;
    left: 25px;
    width: 100%;
    max-width: ${props => (props.open ? '305px' : '0px')};
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;

    ${props => (props.open ? visible : hidden)}
    visibility: visible;
    transition: all 0.4s;
  }

  .chevron-wrapper {
    position: absolute;
    height: 50px;
    width: 50px;
    left: -40px;

    transform: rotate(${props => (props.open ? '-180deg' : '0')});
    ${flexCenter()}

    cursor: pointer;
    transition: all 0.4s 0.1s;
  }

  .search-icon-wrapper {
    position: absolute;
    right: 0px;
    height: 50px;
    width: 50px;

    ${flexCenter()}
    cursor: pointer;

    svg {
      transform: translate(-1px, -1px);
    }
  }
`;

export const PetList = styled.div<SearchPetProps>`
  position: fixed;
  top: 140px;
  right: ${props => (props.open ? '28px' : '-500px')};

  transition: all 0.4s ${props => (props.open ? '.2s' : '.0s')};
`;

export const TogglesContainer = styled.div<SearchPetProps>`
  position: fixed;
  top: 84px;
  right: 35px;
  display: flex;
  column-gap: 20px;

  ${props => (props.open ? visible : hidden)}

  transition: all .2s;
`;
