import { Button } from '@/components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen  ">
      <div className="text-center w-72">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page Not Found</p>

        <Button className="w-full" onClick={() => navigate('/')}>
          Go to home
        </Button>
      </div>
    </div>
  );
};
