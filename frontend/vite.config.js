import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { transform } from 'esbuild'

const jsxInEditable = {
  name: 'jsx-in-react-bootstrap-editable',
  enforce: 'pre',
  async transform(code, id) {
    // Windows-safe path check + only target this package
    if (
      id.includes('node_modules') &&
      id.replace(/\\/g, '/').includes('react-bootstrap-editable') &&
      id.endsWith('.js')
    ) {
      const result = await transform(code, { loader: 'jsx' })
      return { code: result.code, map: result.map }
    }
  },
}

export default defineConfig({
  plugins: [react(), jsxInEditable],
  optimizeDeps: {
    include: ['react-bootstrap-editable'],
    force: true,
    esbuildOptions: {
      // make pre-bundling also treat .js as JSX when hitting this dep
      loader: { '.js': 'jsx' },
    },
  },
  // If you’re using plain React, you usually don’t need these — remove if unsure.
  // esbuild: {
  //   jsxFactory: 'h',
  //   jsxFragment: 'Fragment'
  // }
})
