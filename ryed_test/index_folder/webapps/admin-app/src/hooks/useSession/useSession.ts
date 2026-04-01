import { useGetCurrentUserQuery } from '@/api/authEndpoints';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useSession = () => {
  const { data: user, isLoading, error } = useGetCurrentUserQuery({});

  const posthog = usePostHog();

  useEffect(() => {
    if (user) {
      posthog?.identify(user.id, {
        ...user,
      });
      posthog?.group('company', user.id);
    }
  }, [posthog, user]);

  useEffect(() => {
    if (error) {
      //@ts-ignore
      toast.error(error.message);
    }
  }, [error]);
  console.log(user);

  return {
    isLoading,
    isAuthenticated: !isLoading && user,
    user,
  };
};
