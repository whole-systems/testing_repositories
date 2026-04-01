import { TStep } from '../../types';

export const resolveNextStepIndex = (
  steps: TStep[],
  currentStepIndex: number
) => {
  let startIndex = currentStepIndex;

  // Iterate forward through the steps
  while (startIndex < steps.length - 1) {
    startIndex++;
    // Check if the step at this index is not hidden
    if (!steps[startIndex]?.hidden) {
      // If we find a non-hidden step, break the loop
      break;
    }
    // If the step is hidden, continue to the next step
  }

  // Return the index of the next non-hidden step
  // If no non-hidden step is found, this will return the last step index
  return startIndex;
};

export const resolvePreviousStepIndex = (
  steps: TStep[],
  currentStepIndex: number
) => {
  let startIndex = currentStepIndex;

  // Iterate backwards through the steps
  while (startIndex > 0) {
    startIndex--;
    // Check if the step at this index is not hidden
    if (!steps[startIndex]?.hidden) {
      // If we find a non-hidden step, break the loop
      break;
    }
    // If the step is hidden, continue to the previous step
  }

  // Return the index of the previous non-hidden step
  // If no non-hidden step is found, this will return 0 (the first step)
  return startIndex;
};
