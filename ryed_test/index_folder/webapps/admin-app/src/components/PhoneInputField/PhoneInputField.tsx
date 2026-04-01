import 'react-phone-number-input/style.css';
import './styles.css';
import PhoneInput, {
  DefaultInputComponentProps,
} from 'react-phone-number-input';
import { FC } from 'react';

import { Card } from '../ui/Card/Card';

export const PhoneInputField: FC<DefaultInputComponentProps> = ({
  className,
  ...props
}) => {
  return (
    <Card className="pl-4 py-2 flex pr-0 flex justify-between">
      <PhoneInput
        {...props}
        onChange={props.onChange}
        initialValueFormat="national"
        defaultCountry="IL"
        international
        countryCallingCodeEditable={false}
        className={`${className} phone-input`}
      />
    </Card>
  );
};
