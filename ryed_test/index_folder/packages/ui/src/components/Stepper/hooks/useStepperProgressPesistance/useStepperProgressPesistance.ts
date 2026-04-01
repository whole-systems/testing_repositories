import { useCallback, useEffect, useState } from 'react';
import {
  clearStepperProgressFromLocalStorage,
  loadStepperProgressFromLocalStorage,
  saveStepperProgressToLocalStorage,
} from './helpers';

export interface IStepperProgress {
  [key: string]: boolean;
}

export interface IUseStepperProgressPesistanceParams {
  localStorageProgressKey?: string;
}

export const useStepperProgressPesistance = ({
  localStorageProgressKey,
}: IUseStepperProgressPesistanceParams) => {
  const [progress, setProgress] = useState<IStepperProgress>(() =>
    localStorageProgressKey
      ? loadStepperProgressFromLocalStorage(localStorageProgressKey)
      : {}
  );

  const clearProgress = useCallback(() => {
    if (!localStorageProgressKey) return;
    clearStepperProgressFromLocalStorage(localStorageProgressKey);
    setProgress({});
  }, [localStorageProgressKey]);

  useEffect(() => {
    if (!localStorageProgressKey) return;

    console.log(
      'Saving stepper progress at ',
      localStorageProgressKey,
      progress
    );

    if (Object.keys(progress || {}).length > 0) {
      saveStepperProgressToLocalStorage(localStorageProgressKey, progress);
    }
  }, [progress, localStorageProgressKey]);

  return {
    progress,
    clearProgress,
    setProgress,
  };
};
