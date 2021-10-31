import styled from 'styled-components';
import { rem, flexCenter, theme } from '../../styles/index';

interface ToggleProps {
  active: boolean;
}

export const Container = styled.div<ToggleProps>`
  height: 20px;
  width: auto;

  display: flex;
  align-items: center;
  column-gap: 10px;

  font-size: 14px;

  cursor: pointer;

  .toggle {
    position: relative;
    width: 36px;
    height: 100%;

    border-radius: 50px;
    background-color: ${props => (props.active ? '#4093A8' : '#5B5A5A')};

    transition: all 0.2s;

    .toggle-boll {
      position: absolute;
      top: 3px;
      left: ${props => (props.active ? '19px' : '2px')};
      height: 14px;
      width: 14px;

      border-radius: 50px;
      background-color: ${props => (props.active ? '#E5E5E5' : '#c4c4c4')};

      transition: all 0.2s;
    }
  }
`;
