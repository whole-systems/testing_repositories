import { useStepper } from '@ryed-ui/components';
import { useEffect } from 'react';

interface IUseStepperAllowRedirectProps {
  allowRedirect: boolean;
}

export const useStepperAllowRedirect = ({
  allowRedirect,
}: IUseStepperAllowRedirectProps) => {
  const { helpers } = useStepper();

  useEffect(() => {
    helpers.handleAllowRedirect(allowRedirect);
  }, [allowRedirect]);
};
