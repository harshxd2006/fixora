import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const groqApiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;

  return {
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        '/api/chat': {
          target: 'https://api.groq.com/openai/v1/chat/completions',
          changeOrigin: true,
          rewrite: () => '',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (groqApiKey) {
                proxyReq.setHeader('Authorization', `Bearer ${groqApiKey}`);
              }
            });
          }
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('framer-motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('react')) {
                return 'vendor-react';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
