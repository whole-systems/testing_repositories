import { LoaderCircle } from 'lucide-react';
import { FunctionComponent } from 'react';

export interface ILoaderProps {
  size?: number;
}

export const Loader: FunctionComponent<ILoaderProps> = ({ size = 48 }) => (
  <LoaderCircle size={size} color="#fff" className="animate-spin" />
);
