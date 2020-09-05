module.exports = function(api) {
  api.cache(true)

  return {
    presets: [
      'module:metro-react-native-babel-preset'
    ],
    plugins: [
      [
        "babel-plugin-styled-components",
        {
          "displayName": true,
          "fileName": true
        }
      ],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      '@babel/plugin-syntax-class-properties'
    ],
    env: {
      production: {

      },
    }
  }
}