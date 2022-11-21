import { IShip } from './Ship';
import env from '../../../env';
import { IEngine } from './Engine';

const SIZE = env.game.grid;

export const isOutOfGameBoard = (row, col) => {
  return row < 0 || row > SIZE - 1 || col < 0 || col > SIZE - 1;
};

export const isFitInGameBoard = (ship, row, col, isVertical) => {
  if (isVertical) {
    if (col + ship.length > SIZE) return false;
  } else {
    if (row + ship.length > SIZE) return false;
  }
  return true;
};

export const isFieldTaken = (ship, row, col, isVertical, board) => {
  if (isVertical) {
    for (let i = 0; i < ship.length; i++) {
      try {
        if (board[row][col + i]) return false;
      } catch (e) {
        return true;
      }
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      try {
        if (board[row + i][col]) return false;
      } catch (e) {
        return true;
      }
    }
  }
  return true;
};

export const isNeighbourFieldsAreTaken = (ship, row, col, isVertical, board) => {
  // case any of the neighbour fields are already taken
  if (isVertical) {
    for (let i = 0; i < ship.length; i++) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (row + x < 0 || row + x >= SIZE || col + y + i < 0 || col + y + i >= SIZE) continue;
          if (board[row + x][col + y + i]) return false;
        }
      }
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (row + x + i < 0 || row + x + i >= SIZE || col + y < 0 || col + y >= SIZE) continue;
          if (board[row + x + i][col + y]) return false;
        }
      }
    }
  }
  return true;
};

export const isEmpty = (board: IShip[][]) => {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] !== null) return false;
    }
  }
  return true;
};

export const getEmptyFieldsAmount = (engine: IEngine) => {
  let result = 0;
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (engine.board[i][j] === null) result++;
    }
  }

  return result;
};
