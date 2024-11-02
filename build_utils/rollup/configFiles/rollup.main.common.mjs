/**
 * Rollup configuration for the main library build.
 * @file This file is saved as `main.mjs`.
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from 'rollup-plugin-swc3';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import progress from 'rollup-plugin-progress';

import svgrConfig from '../../../svgr.config.mjs';
import importStyles from '../customPlugins/importStyles.mjs';
import stripCustomWindowVariables from '../customPlugins/stripCustomWindowVariables.mjs';
import { ENVS } from '../../config/index.mjs';
import {
  entryPath,
  outputPath,
  stylesPath,
} from '../../config/commonPaths.mjs';

const config = {
  input: entryPath,
  output: [
    {
      dir: outputPath,
      format: 'esm',
      sourcemap: ![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: `esm/[name].js`,
      chunkFileNames: `esm/[name].js`,
    },
    {
      dir: outputPath,
      format: 'cjs',
      sourcemap: ![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: `cjs/[name].js`,
      chunkFileNames: `cjs/[name].js`,
    },
  ],
  external: [/node_modules/], // Exclude node_modules
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.scss', '.css'],
    }),
    swc(),
    commonjs(),
    [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) &&
      stripCustomWindowVariables({
        variables: ['abc'],
      }),
    postcss({
      extensions: ['.css', '.scss'],
      extract: stylesPath,
      minimize: [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
      modules: true,
      use: ['sass'],
    }),
    image(),
    url(),
    svgr(svgrConfig),
    json(),
    importStyles(),
    progress(),
  ],
};

export default config;
