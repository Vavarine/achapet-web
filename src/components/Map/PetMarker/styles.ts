import { Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';

import { rem, flexCenter } from '../../../styles/index';

export const Status = styled.p``;

interface PetCardProps {
  status: string;
}

export const PetCard = styled(Popup)<PetCardProps>`
  height: 80px;
  width: 200px;
  border-radius: 18px;

  & > div {
    cursor: pointer;
  }

  .leaflet-popup-content-wrapper {
    background-color: ${props => {
      return props.status === 'perdido' ? '#FFF5F5' : '#FAFFF5';
    }};
    height: 100%;

    display: flex;
    justify-content: ${props =>
      props.status === 'perdido' ? 'flex-end' : 'flex-start'};
    text-align: ${props => (props.status === 'perdido' ? 'right' : 'left')};

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .leaflet-popup-content {
    margin: 5px;
    margin-top: 2px;
    padding: 5px;

    p {
      margin: 0;
    }

    .status {
      font-size: 10px;
    }

    .name {
      margin-top: 2px;

      line-height: 26px;
      font-size: 24px;
      font-weight: bold;
      text-transform: capitalize;
    }

    .breed {
      position: relative;
      margin-top: auto;
      line-height: 22px;
      font-size: 20px;
      text-transform: capitalize;

      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;

      text-overflow: ellipsis;
    }

    .see-more {
      position: absolute;
      bottom: 6px;
      left: 12px;
      width: calc(100% - 20px);

      background-color: ${props => {
        return props.status === 'perdido' ? '#FFF5F5' : '#FAFFF5';
      }};

      display: flex;
      align-items: center;
      column-gap: 5px;

      margin-top: auto;
      line-height: 22px;
      font-size: 18px;
      text-decoration: underline;

      visibility: hidden;
      opacity: 0;

      transition: all 0.2s;

      svg {
        transform: translateY(2px);
      }
    }

    :hover {
      .see-more {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .leaflet-popup-tip {
    display: none;
  }
`;
