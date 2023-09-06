import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// https://vitejs.dev/config/
// https://github.com/vitejs/vite/issues/1930 .env
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@assets': resolve('./src/assets'),
      '@router': resolve('./src/router'),
      '@views': resolve('./src/views')
    }
  }
})
