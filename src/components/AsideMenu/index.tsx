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

export const AsideMenu = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <S.Header>
      <S.LogoContainer>
        <Doggo />
        <S.Logo>AchaPet</S.Logo>
      </S.LogoContainer>
      <S.ContainerMenu onClick={() => setIsUserModalOpen(true)}>
        {!user || user?.photo?.url.includes('undefined') ? (
          <MdPersonOutline size={20} />
        ) : (
          <img src={user.photo.url} />
        )}
      </S.ContainerMenu>
      <UserModal isOpen={isUserModalOpen} setIsOpen={setIsUserModalOpen} />
    </S.Header>
  );
};
