import { Loader as _Loader } from 'lucide-react';
import { FunctionComponent } from 'react';

export interface ILoaderProps {
  size?: number;
}

export const Loader: FunctionComponent<ILoaderProps> = ({ size = 48 }) => (
  <_Loader size={size} color="#fff" className="animate-spin" />
);
