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
<<<<<<< HEAD
        {screenSize > 1024 && (
          <>
            <a href="/">Adoção</a>
            <a href="/">Depoimentos</a>
          </>
        )}

=======
        {/* <a href="/">Adoção</a> */}
        <a href="/">Depoimentos</a>
>>>>>>> 8a163b96a9a8cf110c5eb74a8bba6e2d950a1c81
        <Link href="login">
          <a href="/">Começar</a>
        </Link>
      </S.LinksNavigation>
    </S.ContainerHeader>
  );
};
