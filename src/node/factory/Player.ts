import { IEngine } from './Engine';

export interface IPlayer {
  name: string;
  aiAttack: (engine: IEngine) => void;
  hasAlreadyHit: (row: number, col: number) => boolean;
  attack: (row: number, col: number, engine: IEngine) => void;
}

export default function Player(playerName: string): IPlayer {
  const name: string = playerName;
  const ineffectiveCoords: number[][] = [];

  const attack = (row: number, col: number, engine: IEngine): void => {
    if (hasAlreadyHit(row, col)) return;

    ineffectiveCoords.push([row, col]);
    engine.attack(row, col);
  };

  const aiAttack = (engine: IEngine): void => {
    if (ineffectiveCoords.length === 100) return;

    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (hasAlreadyHit(row, col)) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }

    ineffectiveCoords.push([row, col]);
    engine.attack(row, col);
  };

  const hasAlreadyHit = (row: number, col: number): boolean => {
    for (let i = 0; i < ineffectiveCoords.length; i++) {
      if (ineffectiveCoords[i][0] === row && ineffectiveCoords[i][1] === col) {
        return true;
      }
    }
    return false;
  };

  return {
    name,
    hasAlreadyHit,
    attack,
    aiAttack,
  };
}
