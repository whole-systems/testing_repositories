import '@mui/material/styles';

import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { GoogleMapsLoader } from './components/GoogleMapsLoader/GoogleMapsLoader';
import { ThemeProvider } from './components/providers/ThemeProvider/ThemeProvider';
import './index.css';
import { router } from './routes';
import { store } from './store';
import { useTranslation } from 'react-i18next';
import { enUS, fr } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

export const App: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  setDefaultOptions({ locale: lang === 'en' ? enUS : fr });

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <GoogleMapsLoader>
          <RouterProvider router={router} />
        </GoogleMapsLoader>
      </ThemeProvider>
      <Toaster
        richColors
        visibleToasts={1}
        icons={{
          success: <CheckCircle2 size="medium" />,
          info: <Info size="medium" />,
          error: <AlertCircle size="medium" />,
          warning: <AlertTriangle size="medium" />,
        }}
        toastOptions={{
          classNames: {
            toast: 'group toast group-[.toaster]:shadow-lg font-inter',
            actionButton:
              'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            cancelButton:
              'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          },
        }}
        position="top-right"
      />
    </Provider>
  );
};
