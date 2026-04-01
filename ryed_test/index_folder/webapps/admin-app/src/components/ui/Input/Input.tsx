import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, onChange, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'email' || name === 'email') {
        e.target.value = e.target.value.toLowerCase().replace(/\s+/g, '');
      }
      onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <input
          type={isPasswordVisible ? 'text' : type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          onChange={handleChange}
          name={name}
          {...props}
        />
        {type === 'password' && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
