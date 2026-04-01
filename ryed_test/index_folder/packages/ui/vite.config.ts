import react from '@vitejs/plugin-react';
import fg from 'fast-glob';
import path from 'path';
import tailwindcss from 'tailwindcss';
import { build } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// Defines an array of entry points to be used to search for files.
const entryPoints = [
  'src/components/**/*.ts',
  'src/hooks/**/*.ts',
  'src/ui/**/*.ts',
  'src/utils/**/*.ts',
  'src/consts/**/*.ts',
];

// Searches for files that match the patterns defined in the array of input points.
// Returns an array of absolute file paths.
const files = fg.sync(entryPoints, { absolute: true });

// Maps the file paths in the "files" array to an array of key-value pair.
const entities = files
  //excluding test files
  .filter(
    (file) =>
      Boolean(
        file.match(
          /(?<=src\/(components|hooks|ui|utils|consts)\/)(?!.*\.test).*$/
        )
      ) && !file.match('node_modules')
  )
  .map((file) => {
    // Extract the part of the file path after the "src" folder and before the file extension.
    const [key] = file.match(/(?<=src\/).*$/) || [];

    // Remove the file extension from the key.
    const keyWithoutExt = key?.replace(/\.[^.]*$/, '');

    return [keyWithoutExt, file];
  });

// Convert the array of key-value pairs to an object using the Object.fromEntries() method.
// Returns an object where each key is the file name without the extension and the value is the absolute file path.
const entries = Object.fromEntries(entities);
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  server: {
    port: 5201,
    open: './dev.tsx',
  },
  plugins: [
    react(),
    dts({ copyDtsFiles: true }),
    tailwindcss(),
    tsconfigPaths({
      ignoreConfigErrors: true,
    }),
    {
      name: 'watch-and-build',
      async buildStart() {
        if (command === 'serve') {
          this.addWatchFile(path.resolve('src'));
        }
      },
      async handleHotUpdate({ file, server }) {
        if (file.includes('src/')) {
          console.log('File changed:', file);
          console.log('Running build...');
          try {
            await build();
            console.log('Build completed successfully');
            server.ws.send({ type: 'full-reload' });
          } catch (error) {
            console.error('Build failed:', error);
          }
          return [];
        }
      },
    },
  ] as any,
  test: {
    exclude: ['node_modules', 'dist'],
    // Add these configurations to handle tsconfig resolution
    root: '.',
    ignoreFiles: ['**/node_modules/**', '**/dist/**'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    resolveConfig: false, // Prevents Vitest from trying to resolve other project configs
    environment: 'jsdom',
    globals: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: {
        ...entries,
        index: './src/index.ts',
      },
      formats: ['es'],
      name: 'ui',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
        'formik',
        'sonner',
        '@emotion/react',
        '@emotion/styled',
        /^@mui\/.*/,
        'react-phone-number-input',
        'libphonenumber-js',
        'dayjs',
        'react-day-picker',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-router-dom': 'react-router-dom',
          formik: 'formik',
          sonner: 'sonner',
        },
        entryFileNames: '[name].js',
        preserveModules: true,
      },
    },
    minify: true,
    // Enable watch mode in development
    watch:
      command === 'serve'
        ? { include: 'src/**', exclude: 'node_modules/**' }
        : null,
  },
}));
