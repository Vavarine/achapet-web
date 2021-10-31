import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { FiX } from 'react-icons/fi';
import reverseGeocode from 'latlng-to-zip';
import axios from 'axios';

import useAuth from '../../../hooks/useAuth';

import { theme } from '../../../styles';
import * as S from './styles';
import { User } from '../../../types';

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserModal = ({ isOpen, setIsOpen }: UserModalProps) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  if (user) {
    return (
      <S.UserModal isOpen={isOpen}>
        <div className="close" onClick={() => setIsOpen(false)}>
          <FiX color={theme.color.text} size={24} />
        </div>
      </S.UserModal>
    );
  }

  return <div></div>;
};
