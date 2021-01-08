module.exports = api => {
  api.cache(true)

  const { NODE_ENV } = process.env // test, development, production
  const inTest = NODE_ENV === 'test'

  let presets = [
    '@babel/preset-typescript', [
      '@babel/preset-env', {
        targets: ['last 2 versions', 'ie 11'],
        // modules: api.env('es') ? false : 'commonjs'
        modules: false
      }
    ]
  ]

  if (inTest) {
    presets = [
      '@babel/preset-typescript',
      '@babel/preset-env'
    ]
  }

  const plugins = [
    '@babel/plugin-transform-runtime',
    inTest && '@babel/plugin-proposal-class-properties'
  ]

  return {
    presets,
    plugins
  }
}
