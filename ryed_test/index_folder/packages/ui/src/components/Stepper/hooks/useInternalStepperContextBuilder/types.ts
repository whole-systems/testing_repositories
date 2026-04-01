import { TStep } from '../../types';

export interface IUseInternalStepperContextBuilderProps {
  steps: TStep[];
  initialStepKey?: TStep['key'];
  activeStepKey?: string;
  localStorageProgressKey?: string;
  onChange?: (stepKey: string) => void;
}

export interface IUseInternalStepperContextBuilderState {
  activeStepIndex: number;
  activeStepKey: string;
}
