import { useContext } from 'react';
import { StepperContext } from '../../context/stepper-context';

export const useStepper = () => useContext(StepperContext);
