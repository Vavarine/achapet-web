import styled from 'styled-components';
import Modal from 'react-modal';

import {
  customScrollbar,
  flexCenter,
  rem,
  theme,
  colorShade,
} from '../../../styles/index';

export const UserModal = styled(Modal)`
  position: absolute;
  height: 310px;
  width: 670px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;

  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  outline-color: transparent;

  .close {
    position: absolute;
    top: 5px;
    right: 5px;

    cursor: pointer;
  }

  .info {
    flex-grow: 1;
  }
`;
