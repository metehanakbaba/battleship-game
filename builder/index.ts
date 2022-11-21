import { BuildInvalidate } from 'esbuild';
import { command, Argv } from 'yargs';
import { rmSync } from 'fs';
import { Builder } from './builder';
import { startDevelopmentServer, updateBuildTemplate, watcher } from './plugins';
import env from '../env';

command('build:server', 'Build server.', async (_: Argv) => {
  await Builder('node', {
    sourcemap: false,
    outdir: './build/',
  }).catch(() => {
    process.exit(1);
  });
  process.exit(0);
}).argv;

command('build:client', 'Build client', async (_: Argv) => {
  try {
    await rmSync('./build/public/static', { recursive: true });
  } catch (e) {
    /* empty */
  }

  await Builder('browser', {
    outdir: './build/public/static/',
  }).catch(() => {
    process.exit(1);
  });

  await updateBuildTemplate();
  process.exit(0);
}).argv;

command('dev:server', 'Start the server.', async (_: Argv) => {
  const { rebuild } = await Builder('node', {
    outdir: './build/',
  });

  watcher('./src/node/**/*.ts', rebuild as BuildInvalidate);
}).argv;

command('dev:client', 'Start the server.', async (_: Argv) => {
  const { rebuild } = await Builder('browser', {
    outdir: './build/public/static/',
  });

  watcher('./src/browser/**/*.{ts,tsx}', rebuild as BuildInvalidate);
  await updateBuildTemplate();

  await startDevelopmentServer('./build/public/', env.express.port);
}).argv;
