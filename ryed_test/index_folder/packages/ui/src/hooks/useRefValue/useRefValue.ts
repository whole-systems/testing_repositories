import { MutableRefObject, useLayoutEffect, useRef } from 'react';

export const useRefValue = <TValue>(
  value: TValue,
  manualUpdate?: boolean
): MutableRefObject<TValue> => {
  const ref = useRef(value);

  useLayoutEffect(() => {
    if (manualUpdate) return;

    ref.current = value;
  }, [value, ref, manualUpdate]);

  return ref;
};
