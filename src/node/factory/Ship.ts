import generateUUID from '../../browser/utils/uuid';

export interface IShip {
  id: string;
  name: string;
  sank: boolean;
  length: number;
  hits: number[];
  isSunk: () => boolean;
  hit: (position: number) => void;
}

const Ship = function (shipName: string, size = 0): IShip {
  const hits: number[] = [];
  const length: number = size;
  const name: string = shipName;
  const id: string = generateUUID();

  function hit(position: number): void {
    if (hits.includes(position) || position < 0 || position >= length) return;
    hits.push(position);
  }

  function isSunk(): boolean {
    return hits.length == length;
  }

  return {
    id,
    hit,
    name,
    hits,
    length,
    isSunk,
    sank: hits.length == length,
  };
};

export default Ship;
