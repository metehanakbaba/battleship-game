import React, { ChangeEvent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import GameBoard from './GameBoard';
import Engine, { IEngine } from '../node/factory/Engine';
import Player, { IPlayer } from '../node/factory/Player';
import { alphabets } from './utils/alphabets';
import GameOver from './GameOver';

enum GameStatus {
  PLAYING,
  WIN_COMPUTER,
  WIN_PLAYER,
}

interface IGreet {
  opponent?: boolean;
}

export type IAttack = {
  row: number;
  col: number;
};

const Game: React.FunctionComponent<any> = () => {
  const [owner, setOwner] = useState<IPlayer>(Player('Player'));
  const [enemy, setEnemy] = useState<IPlayer>(Player('AI'));
  const [aiEngine, setAiEngine] = useState<IEngine>(Engine());
  const [playerEngine, setPlayerEngine] = useState<IEngine>(Engine());
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [coordinates, setCoordinates] = useState<string>('');

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const newGameAI = Engine();
    newGameAI.placeRandomly();
    setAiEngine({ ...newGameAI });
    const newPlayerGame = Engine();
    newPlayerGame.placeRandomly();
    setPlayerEngine({ ...newPlayerGame });
  };

  const resetGame = () => {
    setOwner(Player('Player'));
    setEnemy(Player('AI'));
    startGame();
    setGameStatus(GameStatus.PLAYING);
  };

  const attack = ({ row, col }: IAttack) => {
    if (owner.hasAlreadyHit(row, col)) return;
    owner.attack(row, col, playerEngine);
    enemy.aiAttack(aiEngine);
    setOwner({ ...owner });
    setEnemy({ ...enemy });
    checkGameOver();
  };

  const checkGameOver = () => {
    if (aiEngine.isGameOver()) {
      setGameStatus(GameStatus.WIN_COMPUTER);
      return true;
    } else if (playerEngine.isGameOver()) {
      setGameStatus(GameStatus.WIN_PLAYER);
      return true;
    }
    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 👇️ prevent page refresh
    event.preventDefault();
    if (coordinates.length > 1) {
      const row: number = alphabets.findIndex((_) => _ == coordinates[0]);
      const col: number = Number(coordinates.substring(1)) as number;
      if (col <= 10) {
        attack({ row, col: col - 1 });
      }
    }
  };

  return (
    <GameWrapper>
      {gameStatus != GameStatus.PLAYING ? (
        <GameOver message={`${GameStatus.WIN_PLAYER ? 'You won !' : 'Computer Won !'}`} resetGame={resetGame} />
      ) : (
        ''
      )}
      <Boards>
        <Form onSubmit={handleSubmit}>
          <CoordinatesInput
            type="text"
            maxLength={3}
            placeholder="Enter coordinates (row, col), e.g. A5"
            value={coordinates}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const regex = /[A-Z][1-9]?[0-9]/gm;
              let m;
              const text = e.target.value.toUpperCase();

              if (text.length > 1) {
                while ((m = regex.exec(text)) !== null) {
                  // This is necessary to avoid infinite loops with zero-width matches
                  if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                  }

                  // The result can be accessed through the `m`-variable.
                  m.forEach((match) => {
                    setCoordinates(match);
                  });
                }
              } else {
                setCoordinates(text);
              }
            }}
          />
        </Form>
      </Boards>
      <Boards>
        <GameArea>
          <Greet opponent={false}>YOUR FLEET</Greet>
          <GameBoard engine={aiEngine} owner={owner} enemy={enemy} />
        </GameArea>
        <Divider />
        <GameArea>
          <Greet opponent={true}>OPPONENT</Greet>
          <GameBoard engine={playerEngine} owner={enemy} enemy={owner} attack={attack} />
        </GameArea>
      </Boards>
    </GameWrapper>
  );
};

const Divider = styled.div`
  width: 0px;
  height: 550px;

  border: 0.1px solid ${({ theme }) => theme.gray};
`;
const Greet = styled.div<IGreet>`
 ${({ opponent }: IGreet) =>
   opponent
     ? css`
         background: ${({ theme }) => theme.gray};
       `
     : css`
         background: ${({ theme }) => theme.red};
       `}
  font-family: 'Futura';
  font-weight: 300;
  font-style: normal;
  color: #FFF;
  font-weight: 700;
  font-size: 17px;
  line-height: 47px;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  height: 45px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 25px;
}
`;
const GameWrapper = styled.div`
  font-size: 5rem;
`;
const Boards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;
`;

const CoordinatesInput = styled.input`
  font-size: 1rem;
  width: 350px;
  padding: 12px 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 4px;
  font-family: 'Futura';
`;

const Form = styled.form`
  display: inherit;
`;

const GameArea = styled.div``;
export default Game;
