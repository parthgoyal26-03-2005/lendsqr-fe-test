import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass' // or 'sass-embedded'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        //@ts-ignore
        implementation: sass,
        // Optional: Use the modern API if using sass-embedded
        // api: 'modern', 
        // Optional: Inject global variables/mixins into every SCSS file
        // additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
})
