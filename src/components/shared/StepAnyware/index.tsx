import useReState from '@raulpesilva/re-state/dist';
import axios from 'axios';
import { StepWizardChildrenProps } from '../..';
import { User } from '../../../types';
import * as S from './styles';
import api from '../../../services/api';
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
  const sendToBackRegister = async () => {
    const sendData = {
      tipoPost: isActiveLostorFind ? 'achados' : 'perdidos',
      email: props.user.email,
      nome: props.user.name,
      celular: 40028922,
      nomeAnimal: animalName,
      animalTipo: typeAnimal,
      raca: raceAnimal,
      cor: colorAnimal,
      caracteristicas: description,
      latitude: props.latitude,
      longitude: props.longitude,
      fotos: filesUploads,
    };

    // console.log('sendData :>> ', sendData);
    // const { data } = await api.post('/postsAnimals/postagem', sendData);

    const { data } = await api('/postsAnimals/postagem', {
      method: 'POST',
      data: sendData,
    });
    console.log('response api post:>> ', data);
    // axios
    //   .post(
    //     'https://achapet-backend.herokuapp.com/postsAnimals/postagem',
    //     data,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'x-access-token':
    //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5oYSI6IjEyMzQ1NiIsImlhdCI6MTYzNjc0NTE0OX0.6l-TLPDy9eccEk3-HxPeVN0Q9ko11IuzMNDNY7ulF2g',
    //       },
    //     },
    //   )
    //   .then(res => {
    //     console.log('res :>> ', res);
    //   })
    //   .catch(err => {
    //     console.log('err :>> ', err);
    //   });

    // console.log('data response :>> ', response);

    // if (response.status === 200) {
    //   props.goToStep(4);
    // }
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
