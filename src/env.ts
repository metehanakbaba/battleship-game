import * as dotenv from 'dotenv';

dotenv.config();

export default {
  production: process.env.PRODUCTION !== 'true',
  express: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  cors: {
    origin: [],
    optionsSuccessStatus: 200,
    credentials: true,
  },
  game: {
    grid: process.env.GAME_GRID || 10,
    ships: [
      {
        name: 'Battleship',
        size: 5,
        count: 1,
      },
      {
        name: 'Destroyers',
        size: 4,
        count: 2,
      },
    ],
  },
};
