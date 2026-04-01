import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import { ILocation } from '@ryed-ui/hooks/useLocationSelect';
import { Input } from '@ryed-ui/ui';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useGooglePlaceAutocomplete } from './hooks/useGooglePlaceAutocomplete';
import { IAirports, ICountryRegistry } from './types';

interface Props {
  onChooseLocation: (location: ILocation | null) => void;
  onChange?: (event: React.ChangeEvent<unknown>, value: string | null) => void;
  name?: string;
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<unknown>) => void;
  value: string;
  countryName?: string;
  disabled?: boolean;
  tabIndex?: number;

  countryRegistry: ICountryRegistry[];
  config?: IAirports;
  defaultCountry: ICountryRegistry;
  crossCountry?: boolean;
  types?: string[];
}

export const GooglePlaceAutocomplete: FC<Props> = (props) => {
  const {
    onChooseLocation,
    onChange,
    placeholder = 'Search location',
    name,
    onBlur,
    countryName,
    value,
    tabIndex,
    countryRegistry,
    config,
    defaultCountry,
    crossCountry,
    types = [],
  } = props;

  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const specificCountryCode = useMemo(() => {
    return countryRegistry.find((country) => country.name === countryName)
      ?.code;
  }, [countryRegistry, countryName]);

  const {
    suggestions,
    textValue,
    // isLoadingSuggestions,
    handleInputChange,
    handleAutocompleteChange,
  } = useGooglePlaceAutocomplete({
    onChooseLocation,
    specificCountryCode,
    value,
    config,
    countryRegistry,
    defaultCountry,
    crossCountry,
    types,
  });

  const handleBlur = useCallback(
    (event: React.FocusEvent<unknown>) => {
      setOpen(false);
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleInputValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(e);
      onChange?.(e, e.target.value);
      setOpen(e.target.value.length > 0);
    },
    [handleInputChange, onChange]
  );

  const handleFocus = useCallback(() => {
    setOpen(true);
    setIsFocused(true);
  }, []);

  const handleInputClick = useCallback(() => {
    if (isFocused) {
      setOpen(true);
    }
  }, [isFocused]);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, value: any) => {
      handleAutocompleteChange(event, value);
      setOpen(false);
    },
    [handleAutocompleteChange]
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <div
        className="relative w-full flex flex-row flex-nowrap"
        ref={params.InputProps.ref}
      >
        <Input
          {...params.inputProps}
          name={name}
          placeholder={placeholder}
          className="w-full pr-10"
          value={textValue}
          onChange={handleInputValueChange}
          onClick={handleInputClick}
          tabIndex={tabIndex}
        />
        <div className="absolute right-2 top-1/2 flex flex-row items-center flex-nowrap gap-4">
          {params.InputProps.endAdornment}
        </div>
      </div>
    ),
    [
      name,
      placeholder,
      textValue,
      handleInputValueChange,
      handleInputClick,
      tabIndex,
    ]
  );

  return (
    <Autocomplete
      options={suggestions}
      disablePortal
      open={open}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      getOptionLabel={useCallback(
        (option: any) =>
          typeof option === 'object' ? option['description'] : option,
        []
      )}
      popupIcon={
        <span className="text-black dark:text-white text-xs leading-3">▼</span>
      }
      clearIcon={
        <span className="text-black dark:text-white text-xs leading-3">✕</span>
      }
      renderInput={renderInput}
      classes={{
        popupIndicator: 'text-black dark:text-white',
        paper:
          '!bg-white !text-black dark:!bg-secondary dark:!text-white mt-4 border-ring ring-2 ring-ring ring-offset-2',
        endAdornment:
          'flex flex-row flex-nowrap items-center justify-center top-0 static',
        option:
          'text-black dark:text-white dark:hover:!bg-primary hover:!bg-primary hover:!text-secondary',
        noOptions: '!text-black dark:!text-white hover:!bg-transparent', // Added the same style as options
      }}
      className="
[&_.MuiAutocomplete-popupIndicator]:text-black dark:[&_.MuiAutocomplete-popupIndicator]:text-white
[&_button.MuiButtonBase-root]:visible
[&_.MuiAutocomplete-endAdornment]:flex
[&_.MuiAutocomplete-endAdornment]:flex-row
[&_.MuiAutocomplete-endAdornment]:flex-nowrap
[&_.MuiAutocomplete-endAdornment]:items-center
[&_.MuiAutocomplete-endAdornment]:justify-center
[&_.MuiAutocomplete-endAdornment]:top-0
[&_.MuiAutocomplete-endAdornment]:static
[&_.MuiAutocomplete-endAdornment]:gap-1
w-full"
      value={
        // suggestions.find((option) => option.description === textValue) ||
        textValue
      }
    />
  );
};
