import '@/localization/i18n';
import { GlobalLoader } from '@/components/ui/GlobalLoader';
import { useSession } from '@/hooks/useSession';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useLayout } from '@/components/layout/hooks/useLayout.tsx';

export const Layout: React.FC = () => {
  useLayout();

  const { isLoading, isAuthenticated } = useSession();

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-full flex flex-col ">
        <div className="flex">
          <Header />
        </div>

        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="  w-full h-full ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
