import { FC } from 'react';

export const InfoItem: FC<{
  label: string;
  value: string;
  icon?: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div className="flex items-center">
    <div className="flex items-start">
      {icon && <div className="mr-2 mt-1 flex">{icon}</div>}
      <span className="font-semibold">{label}:</span>
      <span className="ml-2"> {value}</span>
    </div>
  </div>
);
