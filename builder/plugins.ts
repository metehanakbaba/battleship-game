import fs from 'fs';
// `chokidar` watcher source changes.
import chokidar from 'chokidar';
// `servor` handy web development server, so I used it.  Servor hasn't type declarations
import servor from 'servor';
// Types
import { BuildInvalidate } from 'esbuild';

export const watcher = (paths: string | ReadonlyArray<string>, rebuild: BuildInvalidate): void => {
  chokidar
    // Watches TypeScript
    .watch(paths, {
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 100,
      },
    })
    // Rebuilds esbuild (incrementally -- see `build.incremental`).
    .on('add', async (path: string) => {
      await rebuild();
      console.log(`File ${path} has been added to sever app`);
    })
    .on('change', async (path: string) => {
      await rebuild();
      console.log(`File ${path} has been changed to sever app`);
    })
    .on('unlink', async (path: string) => {
      await rebuild();
      console.log(`File ${path} has been removed to sever app`);
    })
    .on('addDir', async (path: string) => {
      await rebuild();
      console.log(`Directory ${path} has been added to sever app`);
    })
    .on('unlinkDir', async (path: string) => {
      await rebuild();
      console.log(`Directory ${path} has been removed to sever app`);
    });
};

export const startDevelopmentServer = async (root: string, port: number): Promise<void> => {
  // Start the server.
  await servor({
    root,
    port,
    reload: true,
    static: false,
    fallback: 'index.html',
  });

  console.info([`Servor hot refresh at http://localhost:${port}`]);
};

export const updateBuildTemplate = async (): Promise<void> => {
  // Copy over the html template.
  try {
    await fs.copyFileSync('./src/browser/indexTemplate.html', './build/public/index.html');
  } catch (err) {
    if (err) throw err;
  }
};
