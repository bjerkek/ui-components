module.exports = api => {
  api.cache(true)

  const presets = [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: ['last 2 versions', 'ie 11'],
        // modules: api.env('es') ? false : 'commonjs'
        modules: false
      }
    ]
  ]

  const plugins = [
    '@babel/plugin-transform-runtime'
  ]

  return {
    presets,
    plugins
  }
}
