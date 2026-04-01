import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function fcmSwEnvPlugin() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcDir = path.resolve(__dirname, '../src');

  return {
    name: 'rollup-plugin-fcm-sw-env',
    writeBundle() {
      const fcmSwCode = fs.readFileSync(
        `${srcDir}/service-workers/firebase-messaging-sw.ts`,
        'utf8'
      );

      const transformedCode = fcmSwCode.replace(
        /self\.(\w+)/g,
        (_, varName) => `"${process.env[varName]}"`
      );

      const finalCode = '// IMPORTANT: This file is auto-generated during the build process. Do not modify directly.\n\n' + transformedCode;

      const outputPath = path.resolve('dist', 'firebase-messaging-sw.js');
      fs.writeFileSync(outputPath, finalCode);

      console.log('Firebase Messaging Service Worker generated successfully.');
    }
  };
}
