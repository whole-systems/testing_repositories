export interface IStepperContextHelpers {
  completeStep: (step: string) => void;
  cancelStepCompletion: (step: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: string) => void;
  clearProgress: () => void;
  handleAllowRedirect: (allow: boolean) => void;
}

export type TStep = {
  key: string;
  label: string;
  hidden?: boolean;
  disabled?: boolean;

  // Allows navigation to this step even if its not completed
  passthrough?: boolean;

  // If true, the step will be active even if it's not completed
  alwaysActive?: boolean;
};

export interface IStepperContext {
  helpers: IStepperContextHelpers;
  steps: TStep[];
  activeStepIndex: number;
  activeStepKey: string;
  completedStepsMap: Record<TStep[][number]['key'], boolean>;
  allowRedirect: boolean;
}
