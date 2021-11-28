import styled from 'styled-components';

import { rem, flexCenter, visible, hidden } from '../../../styles/index';

interface Props {
  status: 'achado' | 'perdido';
}

export const Container = styled.div<Props>`
  position: relative;
  width: 480px;
  height: 90px;
  padding: 4px;
  padding-right: 10px;
  margin-bottom: 20px;
  color: #333;

  background-color: ${props =>
    props.status === 'perdido'
      ? 'rgba(255, 232, 232, 1)'
      : 'rgba(239, 255, 223, 1)'};
  /* backdrop-filter: blur(10px); */

  display: flex;
  border-radius: 14px;
  box-shadow: 1px 4px 10px 1px rgb(0 0 0 / 25%);

  cursor: pointer;

  :last-of-type {
    margin-bottom: 0px;
  }

  figure {
    height: 82px;
    width: 82px;
    border-radius: 12px;
    overflow: hidden;

    background-image: url('/assets/petLogoBold.png'),
      linear-gradient(129.16deg, #dddddd 0.65%, #eaeaea 104.09%);

    background-size: cover;

    img {
      height: 100%;
      width: 100%;

      object-fit: cover;
    }
  }

  .pet-info {
    position: absolute;
    height: calc(100% - 10px);
    left: 90px;
    padding: 3px 0;
    margin-left: 6px;
    display: flex;
    flex-direction: column;

    span {
      display: block;
      margin-bottom: auto;
      line-height: 22px;
    }

    h4 {
      font-size: 18px;
      font-weight: bold;
      line-height: 18px;
    }

    p {
      position: relative;
      width: fit-content;
      width: 180px;
      font-size: 18px;
      line-height: 18px;
      overflow: hidden;
      white-space: nowrap;

      &::after {
        position: absolute;
        display: block;

        top: 0;
        right: 0;
        content: '';

        height: 100%;
        width: 40px;

        background: linear-gradient(to right, transparent, #ffe8e8);
      }
    }
  }

  .location-info {
    padding: 3px 0;
    margin-left: auto;
    text-align: right;

    display: flex;
    flex-direction: column;

    h5 {
      margin-bottom: auto;
      font-size: 18px;
      font-weight: bold;
      line-height: 22px;
      white-space: nowrap;
    }

    p {
      font-size: 18px;
      line-height: 18px;
    }
  }
`;
