import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { setCookie } from 'nookies';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { theme } from '../../styles';
import * as S from './styles';

interface TutorialModalProps {
  dontShowTutorial: boolean;
}

export const TutorialModal = ({ dontShowTutorial }: TutorialModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log(dontShowTutorial);
  });

  function handleDontShowTutorial() {
    setIsOpen(false);

    setCookie(undefined, 'achapet.dontShowTutorial', 'true', {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  if (!dontShowTutorial) {
    return (
      <S.TutorialModal isOpen={isOpen}>
        <div
          className="close"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <FiX color={theme.color.text} size={24} />
        </div>
        <S.InfoCarousel
          autoPlay={true}
          showIndicators={false}
          renderArrowPrev={(clickHandler, hasPrev) => (
            <S.PrevArrow isActive={hasPrev} onClick={clickHandler}>
              Anterior
            </S.PrevArrow>
          )}
          renderArrowNext={(clickHandler, hasNext) => (
            <S.NextArrow isActive={hasNext} onClick={clickHandler}>
              Próximo
            </S.NextArrow>
          )}
        >
          <div>
            <figure>
              <img src="/assets/search-pet.gif" alt="" />
            </figure>
            <p>
              Para buscar um pet, clique na lupa no canto superior direito. Ao
              clicar no card de um pet, você será levado até ele.
            </p>
          </div>
          <div>
            <figure>
              <img src="/assets/user-config.gif" alt="" />
            </figure>
            <p>
              Para editar as configurações da sua conta, adicionar uma foto ou
              sair clique no botão de perfil no canto inferior esquerdo.
            </p>
          </div>
          <div>
            <figure>
              <img src="/assets/user-config.gif" alt="" />
            </figure>
            <p>Para buscar um pet, clique na lupa no canto superior direito</p>
          </div>
        </S.InfoCarousel>
        <p className="dont-show-anymore" onClick={handleDontShowTutorial}>
          Obrigado! Não precica mais me mostrar
        </p>
      </S.TutorialModal>
    );
  }

  return <div></div>;
};
