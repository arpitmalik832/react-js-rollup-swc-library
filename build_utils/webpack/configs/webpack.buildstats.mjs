/**
 * Webpack Build Stats configuration.
 * @file The file is saved as `build_utils/webpack/webpack.buildstats.mjs`.
 */
import { BuildStatsPlugin } from '../customPlugins/BuildStats.mjs';

/**
 * Generates the Webpack configuration for build stats.
 * @param {string} type - The type of build (e.g., 'dll' or 'main').
 * @returns {object} The Webpack configuration object.
 * @example
 * const config = getConfig('main');
 * console.log(config);
 */
function getConfig(type) {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const path = `distInfo/storybook/${process.env.STORY_ENV}/buildStats`;

  return {
    plugins: [
      new BuildStatsPlugin({
        outputPath: `${path}/${timestamp}.json`,
      }),
    ],
  };
}

export default getConfig;
