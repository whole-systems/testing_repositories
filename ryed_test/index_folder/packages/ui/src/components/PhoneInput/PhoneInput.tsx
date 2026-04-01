import { Input } from '@ryed-ui/ui';
import { useState, useMemo, InputHTMLAttributes } from 'react';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import { CountryIso2 } from 'react-international-phone';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  country?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  label,
  error,
  disabled,
  placeholder = 'Phone number',
  inputProps,
  country: defaultCountryProp = 'il',
  onBlur,
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: defaultCountryProp,
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = useMemo(() => {
    return defaultCountries.filter((c) => {
      const parsed = parseCountry(c);
      return parsed.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <Input
          ref={inputRef}
          name={inputProps?.name}
          type="tel"
          placeholder={placeholder}
          value={inputValue}
          onChange={handlePhoneValueChange}
          onFocus={() => setIsDropdownOpen(false)}
          onBlur={onBlur}
          className={`w-full px-12 py-3 pr-4`}
          disabled={disabled}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
        >
          <FlagImage iso2={country.iso2} />
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          <div className="absolute z-20 top-full mt-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md shadow-lg w-full max-h-64 overflow-y-auto custom-scrollbar">
            <div className="px-3 py-2 sticky top-0 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700">
              <input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {filteredCountries.map((c, index) => {
              const parsed = parseCountry(c);
              return (
                <div
                  key={parsed.iso2}
                  onClick={() => {
                    setCountry(parsed.iso2 as CountryIso2);
                    setIsDropdownOpen(false);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition hover:bg-gray-100 dark:hover:bg-zinc-700 ${
                    index !== 0
                      ? 'border-t border-gray-200 dark:border-zinc-700'
                      : ''
                  }`}
                >
                  <div className="w-8">
                    <FlagImage iso2={parsed.iso2} />
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="text-sm text-gray-800 dark:text-white">
                      {parsed.name}
                    </span>
                    <span className="text-sm text-gray-800 dark:text-white">
                      +{parsed.dialCode}
                    </span>
                  </div>
                </div>
              );
            })}
            {filteredCountries.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No countries found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// import { ctw } from '@ryed-ui/utils/ctw';
// import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
// import {
//   FunctionComponent,
//   useCallback,
//   useState,
//   useEffect,
//   ClipboardEvent,
// } from 'react';
// import PhoneInputCore, {
//   PhoneInputProps as _PhoneInputProps,
//   CountryData,
// } from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import styles from './PhoneInput.module.scss';

// export type PhoneInputStylesPropsNames =
//   | 'inputClass'
//   | 'buttonClass'
//   | 'dropdownClass'
//   | 'searchClass'
//   | 'containerStyle'
//   | 'inputStyle'
//   | 'buttonStyle'
//   | 'dropdownStyle'
//   | 'searchStyle';

// export type PhoneInputPropsWithoutStyleProps = Omit<
//   _PhoneInputProps,
//   PhoneInputStylesPropsNames
// >;

// export type PhoneInputProps = PhoneInputPropsWithoutStyleProps;

// const removeDuplicateDialCode = (
//   valueWithPlus: string,
//   dialCode: string
// ): string => {
//   const prefix = '+' + dialCode;
//   const duplicatePrefix = prefix + dialCode;
//   if (valueWithPlus.startsWith(duplicatePrefix)) {
//     return prefix + valueWithPlus.slice(duplicatePrefix.length);
//   }
//   return valueWithPlus;
// };

// export const PhoneInput: FunctionComponent<PhoneInputProps> = (props) => {
//   const {
//     disableSearchIcon = true,
//     disabled,
//     onChange,
//     country = 'il',
//     value,
//     ...restProps
//   } = props;

//   const { value: __, ...inputPropsRest } = (restProps.inputProps || {}) as any;
//   const inputProps = {
//     ...inputPropsRest,
//     className:
//       'ml-[48px] w-[calc(100%-48px)] outline-none bg-background text-secondary-foreground',
//     maxLength: 20,
//   };

//   const [selectedCountry, setSelectedCountry] = useState<string>(
//     String(country)
//   );
//   useEffect(() => {
//     setSelectedCountry(String(country));
//   }, [country]);

//   const handleChange = useCallback(
//     (rawValue: string, countryData: CountryData, e: any) => {
//       console.log('rawValue', rawValue);
//       const dialCode = countryData.dialCode;
//       let normalized = rawValue;
//       if (!rawValue.startsWith('+')) {
//         normalized = '+' + rawValue;
//       }
//       const fixedValue = removeDuplicateDialCode(normalized, dialCode);
//       const phoneNumber = parsePhoneNumberFromString(
//         fixedValue,
//         countryData.countryCode.toUpperCase() as CountryCode
//       );
//       if (phoneNumber) {
//         onChange?.(phoneNumber.number, countryData, e, phoneNumber.number);
//         return;
//       }
//       onChange?.(rawValue, countryData, e, rawValue);
//     },
//     [onChange]
//   );

//   const handlePaste = useCallback(
//     (e: ClipboardEvent<HTMLInputElement>) => {
//       const pastedText = e.clipboardData.getData('Text');
//       if (!pastedText) return;
//       try {
//         const parsed = parsePhoneNumberFromString(
//           pastedText,
//           String(selectedCountry).toUpperCase() as CountryCode
//         );
//         if (parsed && parsed.country) {
//           setSelectedCountry(parsed.country.toLowerCase());
//         }
//       } catch (error) {
//         console.error('Error parsing pasted number', error);
//       }
//     },
//     [selectedCountry]
//   );

//   return (
//     <PhoneInputCore
//       {...restProps}
//       enableLongNumbers={true}
//       value={value}
//       country={selectedCountry}
//       onChange={handleChange}
//       disabled={disabled}
//       disableSearchIcon={disableSearchIcon}
//       containerClass="flex items-center border border-input h-9 focus-within:ring-ring focus-within:ring-1 rounded-md font-inter disabled:cursor-not-allowed disabled:opacity-50 !text-black bg-background text-secondary-foreground min-h-[40px]"
//       inputClass="h-8 border-none outline-none disabled:cursor-not-allowed disabled:opacity-50"
//       searchClass={styles.searchInput}
//       dropdownClass={styles.dropdown}
//       disableInitialCountryGuess={false}
//       countryCodeEditable={false}
//       placeholder="+972 50 123 4567"
//       inputProps={{
//         ...inputProps,
//         onPaste: handlePaste,
//       }}
//       buttonClass={ctw(
//         'rounded-l-md !bg-background !border-input',
//         { 'cursor-not-allowed opacity-50': disabled },
//         styles.flagContainer,
//         styles.hiddenArrow,
//         styles.flagCenter
//       )}
//     />
//   );
// };
