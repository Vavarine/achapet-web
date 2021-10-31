import { useState } from 'react';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';
import { MdPersonOutline } from 'react-icons/md';

import { UserModal } from './UserModal';
import Doggo from '../../assets/doggo.svg';
import { User } from '../../types';
import * as S from './styles';

type AsideMenuProps = {
  user: User;
};

export const AsideMenu = ({ user }: AsideMenuProps) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { logOut } = useAuth();

  function toggleUserModal() {
    setIsUserModalOpen(!isUserModalOpen);
  }

  return (
    <S.Header>
      <S.LogoContainer>
        <Doggo />
        <S.Logo>AchaPet</S.Logo>
      </S.LogoContainer>
      <S.ContainerMenu onClick={toggleUserModal}>
        <MdPersonOutline size={20} />
        <UserModal isOpen={isUserModalOpen} setIsOpen={setIsUserModalOpen} />
      </S.ContainerMenu>
    </S.Header>
  );
};
