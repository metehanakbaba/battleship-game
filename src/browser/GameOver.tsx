import styled from 'styled-components';
import Button from './components/Button';
import React from 'react';

interface Props {
  message: string;
  resetGame: () => void;
}

const GameOver: React.FunctionComponent<Props> = ({ message, resetGame }) => {
  return (
    <GameOverWrapper>
      <EndMessage>
        <p>{message}</p>
        <Button content={'Play again'} onClick={resetGame} />
      </EndMessage>
      <Overlay />
    </GameOverWrapper>
  );
};

const GameOverWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const EndMessage = styled.p`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 500px;
  height: 300px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.gray};
  z-index: 2;
  padding: 2rem;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  border-radius: 14px;
  text-transform: uppercase;
  font-size: 60px;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.6;
`;

export default GameOver;
