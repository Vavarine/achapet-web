import styled from 'styled-components';
import Modal from 'react-modal';

import {
  customScrollbar,
  flexCenter,
  rem,
  theme,
  colorShade,
  hidden,
  visible,
} from '../../../styles/index';

export const UserModal = styled(Modal)`
  position: absolute;
  height: 405px;
  width: 600px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  overflow: hidden;
  outline-color: transparent;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .info {
    flex-grow: 1;
  }

  * {
    font-family: ${theme.font.secondary} !important;
  }
`;

export const UserPhoto = styled.div`
  position: relative;
  height: 85px;
  width: 100%;
  margin-bottom: 54px;
  padding: 0 25px;

  background-color: ${theme.color.blue_300};
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .title {
    font-size: 18px;
    width: 115px;
    text-align: right;
    line-height: 22px;
  }

  figure {
    height: 64px;
    width: 64px;

    position: absolute;
    bottom: -26px;
    left: 38px;

    border-radius: 50%;
    background-color: #c4c4c4;
    ${flexCenter()};

    overflow: hidden;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    input {
      display: none;
    }

    .edit,
    .remove {
      height: 64px;
      width: 64px;

      position: absolute;
      top: 0;
      left: 0;

      border-radius: 50%;
      background-color: rgba(73, 73, 73, 0.2);
      backdrop-filter: blur(6px);

      ${hidden()}
      ${flexCenter()};
      transition: all 0.2s;

      cursor: pointer;
    }

    :hover {
      .edit,
      .remove {
        ${visible()}
      }
    }
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: auto;
  padding: 0 22px 16px 22px;
  display: flex;
  justify-content: flex-end;
  column-gap: 15px;

  button {
    border: none;
    background-color: transparent;
    ${flexCenter()};
    column-gap: 10px;
  }

  .logout {
    margin-right: auto;
  }

  .logout,
  .cancel {
    font-size: 16px;
    color: #ff4a4a;
  }

  .submit {
    height: 32px;
    width: 75px;

    font-size: 16px;
    border-radius: 8px;
    background-color: #50acc3;
    color: ${theme.color.white};
  }
`;

export const InputsContainers = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  .divisor {
  }

  .inputs-container {
    .input-wrapper {
      margin-bottom: 10px;

      display: flex;
      flex-direction: column;

      label {
        margin-left: 5px;
        margin-bottom: 5px;
        font-size: 14px;
        color: ${theme.color.text};
      }

      input {
        height: 32px;
        width: 240px;
        padding-left: 15px;

        border-radius: 8px;
        background: #fff;
        border: 1.5px solid #c6dfe5;
      }
    }
  }
`;
