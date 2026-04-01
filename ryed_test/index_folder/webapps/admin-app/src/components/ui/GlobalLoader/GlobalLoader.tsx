import { Loader } from '@/components/ui/Loader/Loader';

export const GlobalLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
};
