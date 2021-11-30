import Link from 'next/link';
import { useState, useEffect } from 'react';
import * as S from './styles';

export const Header = () => {
  const [screenSize, setScreenSize] = useState(450);
  const getWindowSize = () => {
    const { innerWidth: width } = window;
    setScreenSize(width);
  };

  window.addEventListener('resize', getWindowSize);
  window.addEventListener('load', getWindowSize);

  return (
    <S.ContainerHeader>
      <S.LinkHome>
        AchaPet
        <img src="/assets/petLogo.png" alt="Logo" />
      </S.LinkHome>
      <S.LinksNavigation>
        {screenSize > 1024 && (
          <>
            <a href="#depoiments">Depoimentos</a>
          </>
        )}

        <Link href="login">
          <a href="/">Começar</a>
        </Link>
      </S.LinksNavigation>
    </S.ContainerHeader>
  );
};
