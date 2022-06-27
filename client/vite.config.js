import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {config} from './src/config/config'


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host:true,
//     proxy: {
//       '/api':{
//         target: 'http://localhost:3001',
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/api/, '')
//      }
//     }
//   }
// })

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  console.log(process.env.VITE_ENDPOINT)
  return defineConfig({
    plugins: [react()],
    server: {
      host:true,
      proxy: {
        '/api':{
          target: `${process.env.VITE_ENDPOINT}`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
      }
    }
    }
  });
}
