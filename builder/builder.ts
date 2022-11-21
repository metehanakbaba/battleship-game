import { build, BuildOptions, BuildResult, Platform } from 'esbuild';
import cssServerPlugin from 'esbuild-css-modules-server-plugin';

export const builderOptions: BuildOptions = {
  // Bundles JavaScript.
  bundle: true,
  sourcemap: true,
  incremental: true,
  minify: process.env.NODE_ENV === 'production',
  loader: {
    '.png': 'dataurl',
    '.woff': 'dataurl',
    '.woff2': 'dataurl',
    '.eot': 'dataurl',
    '.ttf': 'dataurl',
    '.svg': 'dataurl',
  },
};

export const Builder = async (platform: Platform, options: BuildOptions): Promise<BuildResult> => {
  builderOptions.entryPoints = [`./src/${platform}/index.ts${platform === 'browser' && 'x'}`];
  builderOptions.platform = platform;

  if (platform == 'browser') {
    builderOptions.plugins = [cssServerPlugin()];
  }

  return await build({
    ...builderOptions,
    ...options,
  } as BuildOptions);
};
