import Ship, { IShip } from './Ship';
import { isEmpty, isFieldTaken, isFitInGameBoard, isNeighbourFieldsAreTaken } from './GameTool';
import env from '../../../env';

interface SunkenShips {
  id: string;
  name: string;
  sank: boolean;
  length: number;
}

export interface IEngine {
  miss: boolean[][];
  isGameOver: () => boolean;
  placeRandomly: () => void;
  sunkenShips: SunkenShips[];
  board: IShip[][];
  place: (ship: IShip, row: number, col: number, isVertical: boolean) => boolean;
  attack: (row: number, col: number) => boolean;
  isPlacementPossible: (ship: IShip, row: number, col: number, isVertical: boolean) => boolean;
}

export default function Engine(): IEngine {
  const miss: boolean[][] = [];
  const board: IShip[][] = [];
  const sunkenShips: SunkenShips[] = [];
  const SIZE = env.game.grid;

  for (let x = 0; x < SIZE; x++) {
    board[x] = [];
    miss[x] = [];
    for (let y = 0; y < SIZE; y++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      board[x][y] = null;
      miss[x][y] = false;
    }
  }

  const attack = (row: number, col: number) => {
    if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) {
      return false;
    }

    if (board[row][col]) {
      let hit = 0;
      const vertical = col > 0 && board[row][col - 1];
      const horizontal = row > 0 && board[row - 1][col];
      if (vertical) {
        let i = 1;
        while (col - i >= 0 && board[row][col - i]) {
          hit++;
          i++;
        }
      } else if (horizontal) {
        let i = 1;
        while (row - i >= 0 && board[row - i][col]) {
          hit++;
          i++;
        }
      }
      board[row][col].hit(hit);
      return true;
    } else {
      miss[row][col] = true;
      return false;
    }
  };

  const place = (ship: IShip, row: number, col: number, isVertical: boolean): boolean => {
    if (!isPlacementPossible(ship, row, col, isVertical)) return false;

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
      }
    }

    const condition = sunkenShips.some(({ id }) => id == ship.id);
    if (!condition) {
      sunkenShips.push({ id: ship.id, name: ship.name, sank: false, length: ship.length });
    }
    return true;
  };

  const placeRandomly = () => {
    if (!isEmpty(board)) return;

    const ships: IShip[] = [];
    env.game.ships.map((ship) => ships.push(Ship(ship.name, ship.size)));

    let placed = 0;

    while (placed < ships.length) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2) === 1;

      if (place(ships[placed], row, col, isVertical)) placed++;
    }
  };

  const isPlacementPossible = (ship: IShip, row: number, col: number, isVertical: boolean) => {
    return (
      isFieldTaken(ship, row, col, isVertical, board) &&
      isFitInGameBoard(ship, row, col, isVertical) &&
      isNeighbourFieldsAreTaken(ship, row, col, isVertical, board)
    );
  };

  const isGameOver = () => {
    board.map((_) => {
      _.filter((ship) => ship && ship.length && ship.isSunk()).map((ship) => {
        if (ship) {
          markSunkenShip(ship);
        }
      });
    });

    return sunkenShips.filter(({ sank }) => sank).length === sunkenShips.length && sunkenShips.length > 0;
  };

  const markSunkenShip = (ship: IShip) => {
    const condition = sunkenShips.some(({ id, sank }) => id == ship.id && !sank);
    if (condition) {
      sunkenShips.map((sunkenShip) => {
        if (sunkenShip.id == ship.id) {
          sunkenShip.sank = true;
        }
        return sunkenShip;
      });
    }
  };

  return {
    board,
    miss,
    attack,
    placeRandomly,
    place,
    isGameOver,
    isPlacementPossible,
    sunkenShips,
  };
}
