import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const dist = 'dist'
const bundle = 'bundle'
// Use this in sourcemaps later
const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `${dist}/${bundle}.cjs.js`,
      format: 'cjs'
    },
    {
      file: `${dist}/${bundle}.esm.js`,
      format: 'esm'
    },
    {
      name: 'UIComponents',
      file: `${dist}/${bundle}.umd.js`,
      format: 'umd'
    }
  ],
  plugins: [
    resolve(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    production && terser()
  ]
}
