import React, { useEffect, useState } from 'react';
import {
  Footer,
  Header,
  MadeByCard,
  WhatPeopleSayCard,
} from '../../components/index';
import Head from 'next/head';
import Link from 'next/link';
import { Route, NavLink, HashRouter } from 'react-router-dom';
// import { Header } from '../../components';
import * as S from '../../styles/pages/landing/styles';

const LandingPage = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return (
    <HashRouter>
      <S.Container>
        <Head>
          <title>Landing | AchaPet</title>
        </Head>
        <Header />
        <main>
          <S.ContainerBackground>
            <S.MainBanner>
              <S.TextContainerMainBanner>
                <h2>
                  AchaPet
                  <img src="/assets/petLogoBold.png" alt="Logo" />
                </h2>
                <p>
                  AchaPet tem a proposta de facilitar a procura por um animal
                  perdido utilizando geolocalização e emitindo alertas de
                  procura e busca por um animal de estimação
                </p>
                <Link href="/institutional/quem-somos">
                  <button>Saiba mais</button>
                </Link>
              </S.TextContainerMainBanner>
              <S.MainBannerImg>
                <img src="/assets/banner-map.png" alt="Logo" />
              </S.MainBannerImg>
            </S.MainBanner>
          </S.ContainerBackground>
          <S.AdoptContainer>
            <S.AdoptContainer />
            <S.AdoptContainerText>
              <h2>AchaPet</h2>
              <p>O site para encontrar seu animal de estimação</p>
              <p>
                Nosso diferencial é ser uma página Web totalmente voltado para
                buscas de animais que se perderam de seus tutores.Atualmente, as
                pessoas procuram seus animais utilizando redese sociais, nossas
                páginas facilitaria isso.
              </p>
              <a>Saiba mais</a>
            </S.AdoptContainerText>
            <S.AdoptContainerImg>
              <img src="/assets/logoPets.png " alt="Logo" />
            </S.AdoptContainerImg>
          </S.AdoptContainer>
          <S.WhatPeopleSay>
            <h2 id="depoiments">
              O que as pessoas dizem sobre o <strong>AchaPet</strong>
            </h2>
            <S.WhatPeopleSayWrapper>
              <WhatPeopleSayCard
                text="Otimo aplicativo consegui encontrar meu pet"
                author="Lindomar"
                data="12/02/12"
              ></WhatPeopleSayCard>
              <WhatPeopleSayCard
                text="Me ajudaram com meu doguinho"
                author="Amanda"
                data="05/12/17"
              ></WhatPeopleSayCard>
              <WhatPeopleSayCard
                text="Pessimo aplicativo, horrivel"
                author="Ana Paula"
                data="16/07/2021"
              ></WhatPeopleSayCard>
            </S.WhatPeopleSayWrapper>
          </S.WhatPeopleSay>
          <S.MadeBy>
            <h2>
              Feito com <span>❤</span> por
            </h2>

            <S.MadeByWrapper>
              <MadeByCard
                name="Amanda"
                photo="/assets/photo-itau.png"
                networks={{
                  linkedin:
                    'https://www.linkedin.com/in/amanda-pereira-020baa180/',
                  github: 'https://github.com/pereiraamanda',
                  instagram: 'https://www.instagram.com/jpereira_amanda/',
                }}
              ></MadeByCard>
              <MadeByCard
                name="Eduardo"
                photo="/assets/photo-du.png"
                networks={{
                  linkedin:
                    'https://www.linkedin.com/in/eduardo-josé-sianga-98535b1b5/',
                  github: 'https://github.com/Sianga',
                  instagram: 'https://www.instagram.com/du_sianga/?hl=pt-br',
                }}
              ></MadeByCard>
              <MadeByCard
                name="Evailson"
                photo="/assets/photo-eva.png"
                networks={{
                  linkedin: 'https://www.linkedin.com/in/evailson-barbosa/',
                  github: 'https://github.com/vavarine',
                  instagram: 'https://www.instagram.com/vavarine_/',
                }}
              ></MadeByCard>
              <MadeByCard
                name="Karina"
                photo="/assets/photo-ana-paula.png"
                networks={{
                  linkedin: 'https://www.linkedin.com/in/dev-karinacorrotti/',
                  github: 'https://github.com/KarinaCorrotti/',
                  instagram: 'https://www.instagram.com/kakinhacurrotti',
                }}
              ></MadeByCard>
              <MadeByCard
                name="Lindomar"
                photo="/assets/photo-sid.jpg"
                networks={{
                  linkedin:
                    'https://www.linkedin.com/in/lindomar-nascimento-dev',
                  github: 'https://github.com/lindomarNascimento',
                  instagram: 'https://www.instagram.com/lindosid/',
                }}
              ></MadeByCard>
            </S.MadeByWrapper>
          </S.MadeBy>
        </main>
        <Footer />
      </S.Container>
    </HashRouter>
  );
};

export default LandingPage;
