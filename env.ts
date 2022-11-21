export interface EnvInterface {
  production: boolean;
  express: { host: string; port: number };
  cors: { origin: never[]; optionsSuccessStatus: number; credentials: boolean };
  game: { grid: number; ships: { name: string; size: number }[] };
}

const env: EnvInterface = {
  production: true,
  express: {
    host: 'localhost',
    port: 3000,
  },
  cors: {
    origin: [],
    optionsSuccessStatus: 200,
    credentials: true,
  },
  game: {
    grid: 10,
    ships: [
      {
        name: 'Battleship',
        size: 5,
      },
      {
        name: 'Destroyers',
        size: 4,
      },
      {
        name: 'Destroyers',
        size: 4,
      },
    ],
  },
};

export default env;
