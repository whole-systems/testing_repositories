// import react from '@vitejs/plugin-react';
// import fs from 'fs';
// import * as path from 'path';
// import { loadEnv } from 'vite';
// import Checker from 'vite-plugin-checker';
// import { defineConfig } from 'vitest/config';
// import { fcmSwEnvPlugin } from "./config/vitePlugins";

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   console.log('Port from env:', env.VITE_PORT);

//   return {
//     port: Number(env.VITE_PORT),
//     define: {
//       'process.env': env,
//     },
//     server: {
//       port: env.VITE_PORT,
//       host: env.VITE_HOST,
//       https: {
//         key: fs.readFileSync(
//           path.resolve(__dirname, 'src/config/ssl/admin-app.ryed.dev-key.pem')
//         ),
//         cert: fs.readFileSync(
//           path.resolve(__dirname, 'src/config/ssl/admin-app.ryed.dev.pem')
//         ),
//       },
//     },
//     plugins: [
//       react(),
//       fcmSwEnvPlugin(),
//       Checker({ typescript: true }),
//     ],
//     resolve: {
//       alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
//     },
//     test: {
//       environment: 'jsdom',
//     },
//   };
// });

import react from '@vitejs/plugin-react';
import fs from 'fs';
import * as path from 'path';
import { loadEnv } from 'vite';
import Checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { fcmSwEnvPlugin } from './config/vitePlugins';

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (command === 'serve') {
    return {
      define: {
        'process.env': env,
      },
      server: {
        port: env.VITE_PORT,
        host: env.VITE_HOST,
        https:
          env.VITE_ENVIRONMENT === 'local'
            ? {
                key: fs.readFileSync(
                  path.resolve(
                    __dirname,
                    'src/config/ssl/admin-app.ryed.dev-key.pem'
                  )
                ),
                cert: fs.readFileSync(
                  path.resolve(
                    __dirname,
                    'src/config/ssl/admin-app.ryed.dev.pem'
                  )
                ),
              }
            : true,
      },
      plugins: [
        react(),
        tsconfigPaths(),
        fcmSwEnvPlugin(),
        Checker({ typescript: true }),
      ],
      resolve: {
        alias: [
          {
            find: 'react',
            replacement: path.resolve(__dirname, 'node_modules/react'),
          },
          {
            find: '@/assets',
            replacement: path.resolve(__dirname, 'public/assets'),
          },
          {
            find: '@ryed-ui/ui',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/ui'
            ),
          },
          {
            find: '@ryed-ui/hooks',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/hooks'
            ),
          },
          {
            find: '@ryed-ui/utils',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/utils'
            ),
          },
          {
            find: '@ryed-ui/components',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/components'
            ),
          },
          {
            find: '@ryed-ui/consts',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/consts'
            ),
          },
          {
            find: '@ryed/ui/ui',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/ui'
            ),
          },
          {
            find: '@ryed/ui/components',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/components'
            ),
          },
          {
            find: '@ryed/ui/hooks',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/hooks'
            ),
          },
          {
            find: '@ryed/ui/utils',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/utils'
            ),
          },
          {
            find: '@ryed/ui/consts',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/consts'
            ),
          },
        ],
      },
      test: {
        environment: 'jsdom',
      },
    };
  } else {
    // command === 'build'
    return {
      plugins: [react(), tsconfigPaths(), Checker({ typescript: true })],
      define: {
        'process.env': env,
      },
      build: {
        target: 'es2022',
        rollupOptions: {
          input: {
            main: './index.html',
            'firebase-messaging-sw':
              './src/service-workers/firebase-messaging-sw.ts',
          },
          output: {
            entryFileNames: (chunkInfo) => {
              return chunkInfo.name === 'firebase-messaging-sw'
                ? '[name].js' // Output service worker in root
                : 'assets/[name]-[hash].js'; // Others in `assets/`
            },
          },
        },
      },
      resolve: {
        alias: [
          {
            find: 'react',
            replacement: path.resolve(__dirname, 'node_modules/react'),
          },
          {
            find: '@/assets',
            replacement: path.resolve(__dirname, 'public/assets'),
          },
          {
            find: '@ryed-ui/ui',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/ui'
            ),
          },
          {
            find: '@ryed-ui/hooks',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/hooks'
            ),
          },
          {
            find: '@ryed-ui/utils',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/utils'
            ),
          },
          {
            find: '@ryed-ui/components',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/components'
            ),
          },
          {
            find: '@ryed-ui/consts',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/consts'
            ),
          },
          {
            find: '@ryed/ui/ui',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/ui'
            ),
          },
          {
            find: '@ryed/ui/components',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/components'
            ),
          },
          {
            find: '@ryed/ui/hooks',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/hooks'
            ),
          },
          {
            find: '@ryed/ui/utils',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/utils'
            ),
          },
          {
            find: '@ryed/ui/consts',
            replacement: path.resolve(
              __dirname,
              'node_modules/@ryed/ui/src/consts'
            ),
          },
        ],
      },
    };
  }
});
