export default defineNuxtConfig({
  modules: ['@vant/nuxt'],
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 100
        },
        propList: ['*'],
        exclude: /(node_module)/,
        selectorBlackList: ['html', '.rem-ignore']
      }
    }
  }
})
