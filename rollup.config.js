
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json';

const browserslist = [
  "> 1%",
  "last 4 versions",
  "Android > 2",
  "last 2 ChromeAndroid versions"
];

export default [
  {
    input: 'src/js/index.js',
    output: {
      name: 'HarbourCordovaSDK',
      file: 'www/harbour-cordova-sdk.js',
      format: 'cjs',
      sourcemap: true,
    },
    external: ['cordova/exec'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: pkg.browserslist,
              },
              modules: false,
            },
          ],
        ],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve({ browser: true, }),
      commonjs(),
//      uglify(),
    ],
  },
]
