import { useStepper } from '@ryed-ui/components/Stepper/hooks/useStepper';
import { useRefValue } from '@ryed-ui/hooks/useRefValue';
import { useEffect, useMemo } from 'react';

interface IUseStepCompletionInvalidateParams {
  stepName: string;
  isValid: boolean;
}

export const useStepCompletionInvalidate = ({
  stepName,
  isValid,
}: IUseStepCompletionInvalidateParams) => {
  const { helpers, completedStepsMap } = useStepper();
  const isCompleted = useMemo(
    () => Boolean(completedStepsMap?.[stepName]),
    [completedStepsMap, stepName]
  );
  const { cancelStepCompletion } = helpers;
  const cancelRef = useRefValue(cancelStepCompletion);

  useEffect(() => {
    if (!isValid && isCompleted) {
      cancelRef.current?.(stepName);
    }
  }, [isValid, isCompleted, stepName, cancelRef]);
};
