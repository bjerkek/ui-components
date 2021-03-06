import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import bundleSize from 'rollup-plugin-bundle-size'
import { terser } from 'rollup-plugin-terser'
import { string } from 'rollup-plugin-string'
import path from 'path'

const dist = 'dist'
const bundle = 'bundle'
const production = !process.env.ROLLUP_WATCH

const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env
const PACKAGE_ROOT_PATH = process.cwd()
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'index.ts')

export default {
  input: INPUT_FILE,
  external: [/@babel\/runtime/],
  output: [
    {
      file: `${dist}/${bundle}.cjs.js`,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: `${dist}/${bundle}.esm.js`,
      format: 'esm',
      sourcemap: true
    },
    {
      name: LERNA_PACKAGE_NAME,
      file: `${dist}/${bundle}.umd.js`,
      format: 'umd',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: `${LERNA_ROOT_PATH}/tsconfig.json`,
      sourceMap: true
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      rootMode: 'upward'
    }),
    string({
      include: ['**/*.html', '**/*.svg']
    }),
    production && terser(),
    bundleSize()
  ]
}
