import { useRefValue } from '@ryed-ui/hooks/useRefValue';
import { useEffect, useMemo, useState } from 'react';
import { IStepperContext, IStepperContextHelpers } from '../../types';
import { useStepperProgressPesistance } from '../useStepperProgressPesistance';
import { resolveNextStepIndex, resolvePreviousStepIndex } from './helpers';
import {
  IUseInternalStepperContextBuilderProps,
  IUseInternalStepperContextBuilderState,
} from './types';

export const useInternalStepperContextBuilder = ({
  steps,
  initialStepKey,
  activeStepKey,
  localStorageProgressKey,
  onChange,
}: IUseInternalStepperContextBuilderProps): IStepperContext => {
  const onChangeRef = useRefValue(onChange);

  const { progress, clearProgress, setProgress } = useStepperProgressPesistance(
    {
      localStorageProgressKey,
    }
  );

  const [state, setState] = useState<IUseInternalStepperContextBuilderState>(
    () => ({
      activeStepIndex: initialStepKey
        ? activeStepKey
          ? steps.map((step) => step.key).indexOf(activeStepKey)
          : steps.map((step) => step.key).indexOf(initialStepKey)
        : 0,
      activeStepKey: activeStepKey || initialStepKey || steps[0]?.key || '',
    })
  );

  const [allowRedirect, setAllowRedirect] = useState(true);

  // Update active step key if it changes
  useEffect(() => {
    if (activeStepKey) {
      setState((prev) => ({
        ...prev,
        activeStepKey,
        activeStepIndex: steps.map((step) => step.key).indexOf(activeStepKey),
      }));
    }
  }, [activeStepKey, steps]);

  // Handle onChange event for stepper
  // useOnChangeHandle(state.activeStepKey, onChange);

  const activeStepIndexRef = useRefValue(state.activeStepIndex);

  const helpers: IStepperContextHelpers = useMemo(
    () => ({
      previousStep: () => {
        const newActiveStepIndex = resolvePreviousStepIndex(
          steps,
          activeStepIndexRef.current
        );
        const newActiveStepKey = steps[newActiveStepIndex]?.key;

        setState((prev) => {
          return {
            ...prev,
            activeStepIndex: newActiveStepIndex,
            activeStepKey: newActiveStepKey!,
          };
        });

        if (onChangeRef.current && newActiveStepKey) {
          onChangeRef.current(newActiveStepKey);
        }
      },
      nextStep: () => {
        const newActiveStepIndex = resolveNextStepIndex(
          steps,
          activeStepIndexRef.current
        );
        const newActiveStepKey = steps[newActiveStepIndex]?.key;

        setState((prev) => {
          return {
            ...prev,
            activeStepIndex: newActiveStepIndex,
            activeStepKey: newActiveStepKey!,
          };
        });

        if (onChangeRef.current && newActiveStepKey) {
          onChangeRef.current(newActiveStepKey);
        }
      },
      completeStep: (step: string) => {
        setProgress((prev) => ({ ...prev, [step]: true }));
      },
      cancelStepCompletion: (step: string) => {
        setProgress((prev) => ({ ...prev, [step]: false }));
      },
      handleAllowRedirect: (allow: boolean) => {
        setAllowRedirect(allow);
      },
      goToStep: (step: string) => {
        const stepExists = steps.some((s) => s.key === step);
        if (!stepExists) {
          console.warn(`Step "${step}" does not exist in the stepper.`);
          return;
        }
        setState((prev) => {
          const newActiveStepIndex = steps.findIndex((s) => s.key === step);
          if (onChangeRef.current) {
            onChangeRef.current(step);
          }
          return {
            ...prev,
            activeStepKey: step,
            activeStepIndex: newActiveStepIndex,
          };
        });
      },
      clearProgress,
    }),
    [steps, onChangeRef, clearProgress]
  );

  const context = useMemo(
    () => ({
      activeStepIndex: state.activeStepIndex,
      activeStepKey: state.activeStepKey,
      completedStepsMap: progress,
      helpers,
      steps,
      allowRedirect,
    }),
    [state, steps, helpers, progress, allowRedirect]
  );

  return context;
};
