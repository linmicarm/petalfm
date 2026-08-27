import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is the repo name so asset + router paths resolve on GitHub Pages
// (linmicarm.github.io/petalfm/). Change if you rename the repo.
export default defineConfig({
  plugins: [react()],
  base: '/petalfm/',
})
