import { IStepperProgress } from './useStepperProgressPesistance';

export const loadStepperProgressFromLocalStorage = (
  localStorageProgressKey: string
) => {
  const persistedProgress = localStorage.getItem(localStorageProgressKey);

  return persistedProgress ? JSON.parse(persistedProgress) : {};
};

export const saveStepperProgressToLocalStorage = (
  localStorageProgressKey: string,
  progress: IStepperProgress
) => {
  localStorage.setItem(localStorageProgressKey, JSON.stringify(progress));
  return progress;
};

export const clearStepperProgressFromLocalStorage = (
  localStorageProgressKey: string
) => {
  localStorage.removeItem(localStorageProgressKey);
};
