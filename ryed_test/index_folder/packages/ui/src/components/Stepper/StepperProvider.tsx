import { FunctionComponent, ReactNode } from 'react';
import { StepperContext } from './context/stepper-context';
import { useInternalStepperContextBuilder } from './hooks/useInternalStepperContextBuilder';
import { TStep } from './types';

const { Provider } = StepperContext;

export interface IStepperProps {
  // steps to be calculated as keys
  steps: TStep[];
  // initial step to be active
  initialStepKey?: string;
  // children to recieve stepper context

  //active step to be active
  activeStepKey?: string;

  children: ReactNode[] | ReactNode;

  // key to be used for localStorage progress
  localStorageProgressKey?: string;

  onChange?: (stepKey: string) => void;
}

export const StepperProvider: FunctionComponent<IStepperProps> = ({
  steps,
  initialStepKey,
  children,
  activeStepKey,
  localStorageProgressKey,
  onChange,
}) => {
  const context = useInternalStepperContextBuilder({
    steps,
    initialStepKey,
    activeStepKey,
    localStorageProgressKey,
    onChange,
  });

  return <Provider value={context}>{children}</Provider>;
};
