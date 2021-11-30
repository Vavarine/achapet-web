import useReState from '@raulpesilva/re-state/dist';
import axios from 'axios';
import { useCallback } from 'react';
import { StepWizardChildrenProps } from '../..';
import useAuth from '../../../hooks/useAuth';
import api, { formDataApi } from '../../../services/api';
import { User } from '../../../types';
import * as S from './styles';
export interface StepWizardStepAnywareChildrenProps
  extends StepWizardChildrenProps {
  user?: User;
  latitude?: string;
  longitude?: string;
}

export const StepAnyware = ({
  ...props
}: StepWizardStepAnywareChildrenProps) => {
  const [isActiveLostorFind] = useReState('isActiveLostorFind', false);
  const [animalName] = useReState('animalName', '');
  const [typeAnimal] = useReState('animalType', '');
  const [raceAnimal] = useReState('animalRace', '');
  const [colorAnimal] = useReState('animalColor', '');
  const [description] = useReState('descriptionAnimal', '');
  const [currentStep] = useReState('currentStepWizard', null);
  const [filesUploads] = useReState('filesUpload', []);

  const { user } = useAuth();

  const sendToBackRegister = async () => {
    const sendData = {
      status: isActiveLostorFind ? 'achado' : 'perdido',
      email: props.user.email,
      nome: props.user.name,
      celular: user.cellphone,
      nomeAnimal: animalName,
      animalTipo: typeAnimal,
      raca: raceAnimal,
      cor: colorAnimal,
      caracteristicas: description,
      latitude: props.latitude,
      longitude: props.longitude,
      fotos: filesUploads.length > 0 ? filesUploads.join(',') : undefined,
    };

    console.log('sended', sendData);

    const response = await api('/postsAnimals/postagem', {
      method: 'POST',
      data: sendData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      props.goToStep(4);
    }
  };

  return (
    <S.NextPage>
      <S.ProgressContainer>
        <S.ProgressContainerBolls
          onClick={() => props.goToStep(1)}
          active={currentStep >= 1}
        >
          <S.ProgressContainerLine></S.ProgressContainerLine>
        </S.ProgressContainerBolls>
        <S.ProgressContainerBolls
          onClick={() => typeAnimal && props.goToStep(2)}
          active={currentStep >= 2}
        >
          <S.ProgressContainerLine></S.ProgressContainerLine>
        </S.ProgressContainerBolls>
        <S.ProgressContainerBolls
          onClick={() => typeAnimal && props.goToStep(3)}
          active={currentStep === 3}
        />
      </S.ProgressContainer>
      {currentStep !== 1 && currentStep !== null && (
        <S.buttonStepBack onClick={props.previousStep}>Voltar</S.buttonStepBack>
      )}

      {!props.isThird && typeAnimal !== '' && (
        <S.buttonNext onClick={props.nextStep}>Avançar</S.buttonNext>
      )}

      {props.isThird && (
        <S.buttonNext onClick={sendToBackRegister}>É isso!</S.buttonNext>
      )}
    </S.NextPage>
  );
};
