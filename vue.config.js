const appConfig = require('./src/app.config')
const fs = require("fs");
module.exports = {
  pwa: {
    name: 'MSTR.TV',
    themeColor: '#1F87FF',
    msTileColor: '#fff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#1F87FF',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
      exclude: [
        /manifest\.json$/
      ],
    },
  },

  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack(config) {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', appConfig.title)

    // Set up all the aliases we use in our app.
    config.resolve.alias.clear().merge(require('./aliases.config').webpack)

    // Don't allow importing .vue files without the extension, as
    // it's necessary for some Vetur autocompletions.
    config.resolve.extensions.delete('.vue')

    // Only enable performance hints for production builds,
    // outside of tests.
    config.performance.hints(
      process.env.NODE_ENV === 'production' &&
      !process.env.VUE_APP_TEST &&
      'warning'
    )
  },
  css: {
    // Enable CSS source maps only on development
    //sourceMap: process.env.NODE_ENV !== 'production'
  },
  // https://cli.vuejs.org/guide/cli-service.html
  // devServer: {
  //   host: 'mstr.local',
  //   overlay: {
  //     warnings: false,
  //     errors: true
  //   },
  //   https: {
  //     // key: fs.readFileSync("key.pem"),
  //     // cert: fs.readFileSync("cert.pem")
  //   }
  // },
  lintOnSave: false, //process.env.NODE_ENV !== 'production', //disable eslint-loader during production build, you can use the following config:
  productionSourceMap: false,
}
