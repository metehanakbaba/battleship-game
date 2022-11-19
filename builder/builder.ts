import { build, BuildOptions, BuildResult, Platform } from 'esbuild';

const define = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'Production'),
};

Object.keys(process.env).forEach((key) => {
  if (key.indexOf('CLIENT_') === 0) {
    define[`process.env.${key}`] = `'${process.env[key]}'`;
  }
});

export const builderOptions: BuildOptions = {
  // Bundles JavaScript.
  define,
  bundle: true,
  sourcemap: true,
  incremental: true,
  minify: process.env.NODE_ENV === 'production',
  loader: { '.svg': 'dataurl', '.png': 'dataurl' },
};

export const Builder = async (platform: Platform, options: BuildOptions): Promise<BuildResult> => {
  builderOptions.entryPoints = [`./src/${platform}/index.ts${platform === 'browser' && 'x'}`];
  builderOptions.platform = platform;

  return await build({
    ...builderOptions,
    ...options,
  } as BuildOptions);
};
