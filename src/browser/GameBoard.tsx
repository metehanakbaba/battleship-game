import React from 'react';
import styled, { css } from 'styled-components';
import { alphabets } from './utils/alphabets';
import { IEngine } from '../node/factory/Engine';
import { IPlayer } from '../node/factory/Player';
import { IAttack } from './Game';

interface IField {
  status?: string;
  owner?: IPlayer;
}

interface IReferences {
  alphabet?: boolean;
}

interface IShip {
  sank?: boolean;
}

interface IGameBoard {
  engine: IEngine;
  enemy: IPlayer;
  owner: IPlayer;
  attack?: ({ row, col }: IAttack) => void;
}

const GameBoard: React.FunctionComponent<IGameBoard> = ({ engine, enemy, owner, attack }) => {
  const References = ({ alphabet }: IReferences) => {
    const result: JSX.Element[] = [];
    for (let i = 1; i <= 10; i++) {
      const JSX: JSX.Element = <Out>{alphabet ? alphabets[i - 1].toUpperCase() : i}</Out>;
      result.push(JSX);
    }
    return result as unknown as JSX.Element;
  };

  return (
    <Container>
      <MainBoard>
        <ColUnits>
          <References alphabet={false} />
        </ColUnits>
        <RowUnits>
          <References alphabet={true} />
        </RowUnits>
        <GridContainer>
          <Grid>
            {engine.board.map((__, row) => {
              return __.map((_, col) => {
                let status = 'default';
                if (_ && __) {
                  if (owner.name !== 'AI') status = 'ship';
                  if (enemy.hasAlreadyHit(row, col)) status = 'hit';
                } else {
                  if (engine.miss[row][col]) status = 'missed';
                }
                return (
                  <Field
                    key={`${row}${col}`}
                    status={status}
                    owner={owner}
                    onClick={() => {
                      if (attack && owner.name === 'AI') {
                        attack({ row, col });
                      }
                    }}
                  />
                );
              });
            })}
          </Grid>
        </GridContainer>
        <MatchDetails>
          <Badge>{owner.name !== 'AI' ? 'SHIPYARD' : 'GRAVEYARD'}</Badge>
          {engine.sunkenShips.map(({ sank, name, id, length }) => {
            return (
              <Ship key={id} sank={sank}>
                {name} ({length})
              </Ship>
            );
          })}
        </MatchDetails>
      </MainBoard>
    </Container>
  );
};

const Badge = styled.div`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 13px;
  display: flex;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  position: absolute;
  top: -25px;
  color: ${({ theme }) => theme.gray};
`;

const MatchDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  margin-top: 55px;
`;

const Ship = styled.div<IShip>`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  ${({ sank }: IShip) =>
    sank
      ? css`
          color: ${({ theme }) => theme.red};
          text-decoration: line-through;
        `
      : css`
          color: ${({ theme }) => theme.black};
        `}
  &: hover {
    opacity: 0.75;
    cursor: normal;
  }
`;

const Out = styled.div`
  text-align: center;
  position: relative;
  font-size: 17px;
  color: #000;
  max-height: 40px;
  font-family: 'Futura';
  color: ${({ theme }) => theme.gray};
  font-size: 20px;
`;

const ColUnits = styled.section`
  gap: 0px;
  grid-template-columns: repeat(10, 1fr);
  display: grid;
`;

const RowUnits = styled.section`
  margin-left: -25px;
  line-height: 2.5;
  float: left;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
`;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  position: relative;
`;

const Grid = styled.section`
  gap: 0px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;
  position: absolute;
  display: grid;
  grid-auto-flow: row dense;
`;

const MainBoard = styled.div`
  width: 30rem;
  height: 30rem;
`;

const Container = styled.div`
  display: flex;
`;

const Field = styled.div<IField>`
  border: 2px solid ${({ theme }) => theme.body};
  border-radius: 5px;
  transition: all 0.2s ease-out;
  ${({ owner }: IField) =>
    owner?.name === 'AI'
      ? css`
          background: ${({ theme }) => theme.gameBoard.opponent.field};
        `
      : css`
          background: ${({ theme }) => theme.gameBoard.your.field};
        `}
  ${({ status }) =>
    status === 'default' &&
    css`
      background-color: #F0F8F;

      ${({ owner }: IField) =>
        owner?.name === 'AI' &&
        css`
          cursor: pointer;

          &:hover {
            background-color: ${({ theme }) => theme.gameBoard.opponent.hover};
          }
        `}
    `}

  ${({ status }) =>
    status === 'ship' &&
    css`
      background-color: ${({ theme }) => theme.gameBoard.your.hover};
    `}

    ${({ status, owner }) =>
    status === 'missed' &&
    owner?.name == 'AI' &&
    css`
      background-color: ${({ theme }) => theme.gameBoard.opponent.miss};
    `}
    
     ${({ status, owner }) =>
    status === 'missed' &&
    owner?.name != 'AI' &&
    css`
      background-color: ${({ theme }) => theme.gameBoard.your.miss};
    `}

    ${({ status }) =>
    status === 'hit' &&
    css`
      background-color: ${({ theme }) => theme.red};
    `}
`;

export default GameBoard;
