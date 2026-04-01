import { useCallback } from 'react';
import posthog from 'posthog-js';
import { PostHogEvent } from '@/models/posthog';
import { useSelector } from 'react-redux';
import { userSelect } from '@/store/slices/userSlice/selectors';
export const usePosthog = () => {
  const { user } = useSelector(userSelect);
  const trackEvent = useCallback(
    (eventName: PostHogEvent, properties = {}) => {
      posthog.capture(eventName, {
        ...properties,
        agentId: user?.id,
      });
    },
    [user]
  );

  return { trackEvent };
};
