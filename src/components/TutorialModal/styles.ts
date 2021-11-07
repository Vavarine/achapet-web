import styled from 'styled-components';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';

import {
  customScrollbar,
  flexCenter,
  rem,
  theme,
  colorShade,
  hidden,
  visible,
} from '../../styles/index';

interface ArrowProps {
  isActive: boolean;
}

export const TutorialModal = styled(Modal)`
  position: absolute;
  height: 460px;
  width: 560px;
  padding: 32px 20px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  overflow: hidden;

  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  outline-color: transparent;

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .info {
    flex-grow: 1;
  }

  .dont-show-anymore {
    position: absolute;
    bottom: 14px;
    right: 15px;

    font-size: 14px;
    color: ${theme.color.blue_darker};

    cursor: pointer;
  }
`;

export const InfoCarousel = styled(Carousel)`
  /* background-color: red; */
  overflow: visible !important;

  * {
    overflow: visible !important;
  }

  .slide {
    min-height: 305px;

    ${hidden()}
    transition: all 0.2s;

    &.selected {
      ${visible()}
    }

    figure {
      width: 100%;
      margin-bottom: 20px;
      overflow: hidden;

      ${flexCenter()};

      img {
        border-radius: 6px;
        width: 100%;
        height: auto;
      }
    }
  }
`;

export const NextArrow = styled.button<ArrowProps>`
  position: absolute;
  bottom: -80px;
  right: 0px;

  height: 32px;
  width: 100px;
  border-radius: 8px;
  background-color: ${props =>
    props.isActive ? theme.color.blue_500 : '#E5E5E5'};
  color: ${theme.color.white};
  border: none;
  font-size: 14px;

  transition: all 0.2s;
`;

export const PrevArrow = styled.button<ArrowProps>`
  position: absolute;
  bottom: -80px;
  right: 120px;

  height: 32px;
  width: 100px;
  border-radius: 8px;
  background-color: ${props =>
    props.isActive ? theme.color.blue_500 : '#E5E5E5'};
  color: ${theme.color.white};
  border: none;
  font-size: 14px;
  transition: all 0.2s;
`;
