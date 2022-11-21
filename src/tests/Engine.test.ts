import Engine, { IEngine } from '../node/factory/Engine';
import Ship, { IShip } from '../node/factory/Ship';
import { getEmptyFieldsAmount } from '../node/factory/GameTool';

describe('engine', () => {
  let engine: IEngine;
  let ship: IShip;

  beforeEach(() => {
    engine = Engine();
    ship = Ship('Destroyer', 3);
  });

  test('randomly places ships', () => {
    engine.placeRandomly();
    expect(getEmptyFieldsAmount(engine)).toBe(87);
  });

  test('prevents ship placement outside engine', () => {
    engine.place(ship, 1, 1, true);
    expect(engine.isPlacementPossible(ship, 8, 8, true)).toBe(false);
    expect(engine.isPlacementPossible(ship, 10, 10, true)).toBe(false);
  });

  test('prevents ship placement on taken fields', () => {
    engine.place(ship, 1, 1, true);
    expect(engine.isPlacementPossible(ship, 1, 1, true)).toBe(false);
    expect(engine.isPlacementPossible(ship, 1, 2, true)).toBe(false);
    expect(engine.isPlacementPossible(ship, 1, 3, true)).toBe(false);
  });

  test('prevents ship placement in direct neighbourhood of taken fields', () => {
    engine.place(ship, 1, 1, true);
    expect(engine.isPlacementPossible(ship, 0, 0, true)).toBe(false);
    expect(engine.isPlacementPossible(ship, 2, 4, true)).toBe(false);
    expect(engine.isPlacementPossible(ship, 2, 5, true)).toBe(true);
  });

  test('receives attacks', () => {
    engine.place(ship, 1, 1, true);
    engine.attack(1, 3);
    expect(engine.board[1][3].hits.includes(2)).toBe(true);
  });

  test('keeps track of missed shots', () => {
    engine.place(ship, 1, 1, true);
    engine.attack(1, 4);
    expect(engine.miss[1][4]).toBe(true);
  });

  test('tells if game is over', () => {
    expect(engine.isGameOver()).toBe(false);

    engine.place(ship, 1, 1, true);
    expect(engine.isGameOver()).toBe(false);
    engine.attack(1, 1);
    engine.attack(1, 2);
    engine.attack(1, 3);

    engine.place(Ship('Destroyer', 3), 5, 5, false);
    engine.attack(5, 5);
    engine.attack(6, 5);
    engine.attack(7, 5);
    engine.attack(7, 5);
    expect(engine.isGameOver()).toBe(true);
  });
});
