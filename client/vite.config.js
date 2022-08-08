import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    plugins: [react()],
    server: {
      host:true,
    //   proxy: {
    //     '/api':{
    //       target: `${process.env.VITE_ENDPOINT}`,
    //       changeOrigin: true,
    //       rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
    }
  });
}
