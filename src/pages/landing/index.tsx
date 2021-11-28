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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy
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
          <S.DescriptionContainer>
            <h2>AchaPet</h2>
            <h5>O site para encontra seu animal de estimação</h5>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
            </p>
          </S.DescriptionContainer>
          <S.AdoptContainer>
            <S.AdoptContainerText>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </p>
            </S.AdoptContainerText>
            <S.AdoptContainer />
            <S.AdoptContainerText>
              <h2>Adote um pet</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy
              </p>
              <a>Saiba mais</a>
            </S.AdoptContainerText>
            <S.AdoptContainerImg>
              <img src="/assets/logoPets.png " alt="Logo" />
            </S.AdoptContainerImg>
          </S.AdoptContainer>
          <S.WhatPeopleSay>
            <h2>
              O que as pessoas dizem sobre o <strong>AchaPet</strong>
            </h2>
            <S.WhatPeopleSayWrapper>
              <WhatPeopleSayCard
                text="Lorem Ipsum is simply
              dummy text of the printing and typesetting"
                author="Lindomar"
                data="12/02/12"
              ></WhatPeopleSayCard>
              <WhatPeopleSayCard
                text="Lorem Ipsum is simply
              dummy text of the printing and typesetting"
                author="Lindomar"
                data="12/02/12"
              ></WhatPeopleSayCard>
              <WhatPeopleSayCard
                text="Lorem Ipsum is simply
              dummy text of the printing and typesetting"
                author="Lindomar"
                data="12/02/12"
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
                  linkedin: 'teste',
                  github: 'teste',
                  instagram: 'teste',
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
                  linkedin: 'teste',
                  github: 'teste',
                  instagram: 'teste',
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
