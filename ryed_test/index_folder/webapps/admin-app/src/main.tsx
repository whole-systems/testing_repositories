import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from './App.tsx';
import { PostHogProvider } from 'posthog-js/react';

const options = {
  api_host: process.env.VITE_REACT_APP_PUBLIC_POSTHOG_HOST,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={process.env.VITE_REACT_APP_PUBLIC_POSTHOG_KEY || ''}
      options={options}
    >
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
