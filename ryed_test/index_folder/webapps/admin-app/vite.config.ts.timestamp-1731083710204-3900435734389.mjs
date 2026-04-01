// vite.config.ts
import react from "file:///Users/ilyarudnev/Documents/Backend/system/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.1.6/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs2 from "fs";
import * as path2 from "path";
import { loadEnv } from "file:///Users/ilyarudnev/Documents/Backend/system/node_modules/.pnpm/vite@5.1.6_@types+node@20.11.30/node_modules/vite/dist/node/index.js";
import Checker from "file:///Users/ilyarudnev/Documents/Backend/system/node_modules/.pnpm/vite-plugin-checker@0.6.4_eslint@8.57.0_typescript@5.3.3_vite@5.1.6/node_modules/vite-plugin-checker/dist/esm/main.js";
import tsconfigPaths from "file:///Users/ilyarudnev/Documents/Backend/system/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.3.3_vite@5.1.6/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { defineConfig } from "file:///Users/ilyarudnev/Documents/Backend/system/node_modules/.pnpm/vitest@1.0.4_@types+node@20.11.30_@vitest+ui@1.0.4_jsdom@24.0.0/node_modules/vitest/dist/config.js";

// config/vitePlugins.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///Users/ilyarudnev/Documents/Backend/system/webapps/admin-app/config/vitePlugins.ts";
function fcmSwEnvPlugin() {
  const __filename = fileURLToPath(__vite_injected_original_import_meta_url);
  const __dirname2 = path.dirname(__filename);
  const srcDir = path.resolve(__dirname2, "../src");
  return {
    name: "rollup-plugin-fcm-sw-env",
    writeBundle() {
      const fcmSwCode = fs.readFileSync(
        `${srcDir}/service-workers/firebase-messaging-sw.ts`,
        "utf8"
      );
      const transformedCode = fcmSwCode.replace(
        /self\.(\w+)/g,
        (_, varName) => `"${process.env[varName]}"`
      );
      const finalCode = "// IMPORTANT: This file is auto-generated during the build process. Do not modify directly.\n\n" + transformedCode;
      const outputPath = path.resolve("dist", "firebase-messaging-sw.js");
      fs.writeFileSync(outputPath, finalCode);
      console.log("Firebase Messaging Service Worker generated successfully.");
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname = "/Users/ilyarudnev/Documents/Backend/system/webapps/admin-app";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (command === "serve") {
    return {
      define: {
        "process.env": env
      },
      server: {
        port: env.VITE_PORT,
        host: env.VITE_HOST,
        https: env.VITE_ENVIRONMENT === "local" ? {
          key: fs2.readFileSync(
            path2.resolve(
              __vite_injected_original_dirname,
              "src/config/ssl/admin-app.ryed.dev-key.pem"
            )
          ),
          cert: fs2.readFileSync(
            path2.resolve(
              __vite_injected_original_dirname,
              "src/config/ssl/admin-app.ryed.dev.pem"
            )
          )
        } : true
      },
      plugins: [
        react(),
        tsconfigPaths(),
        fcmSwEnvPlugin(),
        Checker({ typescript: true })
      ],
      resolve: {
        alias: [
          {
            find: "@/assets",
            replacement: path2.resolve(__vite_injected_original_dirname, "public/assets")
          },
          {
            find: "@",
            replacement: path2.resolve(__vite_injected_original_dirname, "src")
          }
        ]
      },
      test: {
        environment: "jsdom"
      }
    };
  } else {
    return {
      plugins: [react(), tsconfigPaths(), Checker({ typescript: true })],
      define: {
        "process.env": env
      },
      build: {
        target: "es2022",
        rollupOptions: {
          input: {
            main: "./index.html",
            "firebase-messaging-sw": "./src/service-workers/firebase-messaging-sw.ts"
          },
          output: {
            entryFileNames: (chunkInfo) => {
              return chunkInfo.name === "firebase-messaging-sw" ? "[name].js" : "assets/[name]-[hash].js";
            }
          }
        }
      },
      resolve: {
        alias: [
          {
            find: "@/assets",
            replacement: path2.resolve(__vite_injected_original_dirname, "public/assets")
          },
          {
            find: "@",
            replacement: path2.resolve(__vite_injected_original_dirname, "src")
          }
        ]
      }
    };
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY29uZmlnL3ZpdGVQbHVnaW5zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2lseWFydWRuZXYvRG9jdW1lbnRzL0JhY2tlbmQvc3lzdGVtL3dlYmFwcHMvYWRtaW4tYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaWx5YXJ1ZG5ldi9Eb2N1bWVudHMvQmFja2VuZC9zeXN0ZW0vd2ViYXBwcy9hZG1pbi1hcHAvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2lseWFydWRuZXYvRG9jdW1lbnRzL0JhY2tlbmQvc3lzdGVtL3dlYmFwcHMvYWRtaW4tYXBwL3ZpdGUuY29uZmlnLnRzXCI7Ly8gaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0Jztcbi8vIGltcG9ydCBmcyBmcm9tICdmcyc7XG4vLyBpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuLy8gaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuLy8gaW1wb3J0IENoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XG4vLyBpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbi8vIGltcG9ydCB7IGZjbVN3RW52UGx1Z2luIH0gZnJvbSBcIi4vY29uZmlnL3ZpdGVQbHVnaW5zXCI7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbi8vICAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG4vLyAgIGNvbnNvbGUubG9nKCdQb3J0IGZyb20gZW52OicsIGVudi5WSVRFX1BPUlQpO1xuXG4vLyAgIHJldHVybiB7XG4vLyAgICAgcG9ydDogTnVtYmVyKGVudi5WSVRFX1BPUlQpLFxuLy8gICAgIGRlZmluZToge1xuLy8gICAgICAgJ3Byb2Nlc3MuZW52JzogZW52LFxuLy8gICAgIH0sXG4vLyAgICAgc2VydmVyOiB7XG4vLyAgICAgICBwb3J0OiBlbnYuVklURV9QT1JULFxuLy8gICAgICAgaG9zdDogZW52LlZJVEVfSE9TVCxcbi8vICAgICAgIGh0dHBzOiB7XG4vLyAgICAgICAgIGtleTogZnMucmVhZEZpbGVTeW5jKFxuLy8gICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29uZmlnL3NzbC9hZG1pbi1hcHAucnllZC5kZXYta2V5LnBlbScpXG4vLyAgICAgICAgICksXG4vLyAgICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhcbi8vICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbmZpZy9zc2wvYWRtaW4tYXBwLnJ5ZWQuZGV2LnBlbScpXG4vLyAgICAgICAgICksXG4vLyAgICAgICB9LFxuLy8gICAgIH0sXG4vLyAgICAgcGx1Z2luczogW1xuLy8gICAgICAgcmVhY3QoKSxcbi8vICAgICAgIGZjbVN3RW52UGx1Z2luKCksXG4vLyAgICAgICBDaGVja2VyKHsgdHlwZXNjcmlwdDogdHJ1ZSB9KSxcbi8vICAgICBdLFxuLy8gICAgIHJlc29sdmU6IHtcbi8vICAgICAgIGFsaWFzOiBbeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfV0sXG4vLyAgICAgfSxcbi8vICAgICB0ZXN0OiB7XG4vLyAgICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbi8vICAgICB9LFxuLy8gICB9O1xuLy8gfSk7XG5cbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBDaGVja2VyIGZyb20gJ3ZpdGUtcGx1Z2luLWNoZWNrZXInO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCB7IGZjbVN3RW52UGx1Z2luIH0gZnJvbSAnLi9jb25maWcvdml0ZVBsdWdpbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSwgY29tbWFuZCB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuXG4gIGlmIChjb21tYW5kID09PSAnc2VydmUnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlZmluZToge1xuICAgICAgICAncHJvY2Vzcy5lbnYnOiBlbnYsXG4gICAgICB9LFxuICAgICAgc2VydmVyOiB7XG4gICAgICAgIHBvcnQ6IGVudi5WSVRFX1BPUlQsXG4gICAgICAgIGhvc3Q6IGVudi5WSVRFX0hPU1QsXG4gICAgICAgIGh0dHBzOlxuICAgICAgICAgIGVudi5WSVRFX0VOVklST05NRU5UID09PSAnbG9jYWwnXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBrZXk6IGZzLnJlYWRGaWxlU3luYyhcbiAgICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZShcbiAgICAgICAgICAgICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAnc3JjL2NvbmZpZy9zc2wvYWRtaW4tYXBwLnJ5ZWQuZGV2LWtleS5wZW0nXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoXG4gICAgICAgICAgICAgICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ3NyYy9jb25maWcvc3NsL2FkbWluLWFwcC5yeWVkLmRldi5wZW0nXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgdHNjb25maWdQYXRocygpLFxuICAgICAgICBmY21Td0VudlBsdWdpbigpLFxuICAgICAgICBDaGVja2VyKHsgdHlwZXNjcmlwdDogdHJ1ZSB9KSxcbiAgICAgIF0sXG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZmluZDogJ0AvYXNzZXRzJyxcbiAgICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljL2Fzc2V0cycpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZmluZDogJ0AnLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICB9LFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gY29tbWFuZCA9PT0gJ2J1aWxkJ1xuICAgIHJldHVybiB7XG4gICAgICBwbHVnaW5zOiBbcmVhY3QoKSwgdHNjb25maWdQYXRocygpLCBDaGVja2VyKHsgdHlwZXNjcmlwdDogdHJ1ZSB9KV0sXG4gICAgICBkZWZpbmU6IHtcbiAgICAgICAgJ3Byb2Nlc3MuZW52JzogZW52LFxuICAgICAgfSxcbiAgICAgIGJ1aWxkOiB7XG4gICAgICAgIHRhcmdldDogJ2VzMjAyMicsXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgbWFpbjogJy4vaW5kZXguaHRtbCcsXG4gICAgICAgICAgICAnZmlyZWJhc2UtbWVzc2FnaW5nLXN3JzpcbiAgICAgICAgICAgICAgJy4vc3JjL3NlcnZpY2Utd29ya2Vycy9maXJlYmFzZS1tZXNzYWdpbmctc3cudHMnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gY2h1bmtJbmZvLm5hbWUgPT09ICdmaXJlYmFzZS1tZXNzYWdpbmctc3cnXG4gICAgICAgICAgICAgICAgPyAnW25hbWVdLmpzJyAvLyBPdXRwdXQgc2VydmljZSB3b3JrZXIgaW4gcm9vdFxuICAgICAgICAgICAgICAgIDogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJzsgLy8gT3RoZXJzIGluIGBhc3NldHMvYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmaW5kOiAnQC9hc3NldHMnLFxuICAgICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMvYXNzZXRzJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaWx5YXJ1ZG5ldi9Eb2N1bWVudHMvQmFja2VuZC9zeXN0ZW0vd2ViYXBwcy9hZG1pbi1hcHAvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaWx5YXJ1ZG5ldi9Eb2N1bWVudHMvQmFja2VuZC9zeXN0ZW0vd2ViYXBwcy9hZG1pbi1hcHAvY29uZmlnL3ZpdGVQbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9pbHlhcnVkbmV2L0RvY3VtZW50cy9CYWNrZW5kL3N5c3RlbS93ZWJhcHBzL2FkbWluLWFwcC9jb25maWcvdml0ZVBsdWdpbnMudHNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZjbVN3RW52UGx1Z2luKCkge1xuICBjb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xuICBjb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG4gIGNvbnN0IHNyY0RpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMnKTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdyb2xsdXAtcGx1Z2luLWZjbS1zdy1lbnYnLFxuICAgIHdyaXRlQnVuZGxlKCkge1xuICAgICAgY29uc3QgZmNtU3dDb2RlID0gZnMucmVhZEZpbGVTeW5jKFxuICAgICAgICBgJHtzcmNEaXJ9L3NlcnZpY2Utd29ya2Vycy9maXJlYmFzZS1tZXNzYWdpbmctc3cudHNgLFxuICAgICAgICAndXRmOCdcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHRyYW5zZm9ybWVkQ29kZSA9IGZjbVN3Q29kZS5yZXBsYWNlKFxuICAgICAgICAvc2VsZlxcLihcXHcrKS9nLFxuICAgICAgICAoXywgdmFyTmFtZSkgPT4gYFwiJHtwcm9jZXNzLmVudlt2YXJOYW1lXX1cImBcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGZpbmFsQ29kZSA9ICcvLyBJTVBPUlRBTlQ6IFRoaXMgZmlsZSBpcyBhdXRvLWdlbmVyYXRlZCBkdXJpbmcgdGhlIGJ1aWxkIHByb2Nlc3MuIERvIG5vdCBtb2RpZnkgZGlyZWN0bHkuXFxuXFxuJyArIHRyYW5zZm9ybWVkQ29kZTtcblxuICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IHBhdGgucmVzb2x2ZSgnZGlzdCcsICdmaXJlYmFzZS1tZXNzYWdpbmctc3cuanMnKTtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgZmluYWxDb2RlKTtcblxuICAgICAgY29uc29sZS5sb2coJ0ZpcmViYXNlIE1lc3NhZ2luZyBTZXJ2aWNlIFdvcmtlciBnZW5lcmF0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgIH1cbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUEyQ0EsT0FBTyxXQUFXO0FBQ2xCLE9BQU9BLFNBQVE7QUFDZixZQUFZQyxXQUFVO0FBQ3RCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGFBQWE7QUFDcEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxvQkFBb0I7OztBQ2pEOFYsT0FBTyxRQUFRO0FBQzFZLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUZnTixJQUFNLDJDQUEyQztBQUl4UixTQUFTLGlCQUFpQjtBQUMvQixRQUFNLGFBQWEsY0FBYyx3Q0FBZTtBQUNoRCxRQUFNQyxhQUFZLEtBQUssUUFBUSxVQUFVO0FBQ3pDLFFBQU0sU0FBUyxLQUFLLFFBQVFBLFlBQVcsUUFBUTtBQUUvQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQ1osWUFBTSxZQUFZLEdBQUc7QUFBQSxRQUNuQixHQUFHLE1BQU07QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUVBLFlBQU0sa0JBQWtCLFVBQVU7QUFBQSxRQUNoQztBQUFBLFFBQ0EsQ0FBQyxHQUFHLFlBQVksSUFBSSxRQUFRLElB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
