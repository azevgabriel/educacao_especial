import { useCallback } from 'react';

import { Container, ButtonLink } from './styles';

import trophyImage from '../../../assets/images/trophy.png';

import { useLessonOne } from '../../../hooks/UseLessonOne';
import {} from 'react-router-dom';

export const Modal = () => {
  const { nextAnimal, modalOpen, closeMenu, index, restart } = useLessonOne();

  const restartLesson = useCallback(() => {
    closeMenu();
    restart();
  }, [closeMenu, restart]);

  const handleNextAnimal = useCallback(() => {
    closeMenu();
    nextAnimal();
  }, [nextAnimal]);

  return (
    <Container isVisibility={modalOpen}>
      <img src={trophyImage} alt="Imagem de um troféu" />
      <div className="rightWrapper">
        <h1>Parabéns, você completou a palavra!</h1>
        <ButtonLink to="/jogos">
          <p>Voltar para a página inicial</p>
        </ButtonLink>
        {index === 10 ? (
          <button onClick={restartLesson}>
            <p>Recomeçar!</p>
          </button>
        ) : (
          <button onClick={handleNextAnimal}>
            <p>Próxima palavra!</p>
          </button>
        )}
      </div>
    </Container>
  );
};
