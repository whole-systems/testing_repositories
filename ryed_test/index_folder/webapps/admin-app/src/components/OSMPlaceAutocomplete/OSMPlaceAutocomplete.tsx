import React, { FC, useEffect, useRef } from 'react';
import { Card } from '../ui/Card/Card';
import { Separator } from '../ui/Separator/Separator';
import {
  useOSMPlaceAutocomplete,
  OSMFeatureType,
} from './hooks/useOSMPlaceAutocomplete';

import { Input } from '@/components/ui/Input/Input';
import { OSMLocation } from '@/models/google';

interface Props {
  onChooseLocation: (location: OSMLocation) => void;
  name?: string;
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<unknown>) => void;
  value: string;
  countryCode?: string;
  featureTypes?: OSMFeatureType[];
}

export const OSMPlaceAutocomplete: FC<Props> = (props) => {
  const {
    onChooseLocation,
    placeholder = 'Search location',
    name,
    onBlur,
    value,
    countryCode,
    featureTypes,
  } = props;
  const { data, handlers } = useOSMPlaceAutocomplete(
    onChooseLocation,
    countryCode,
    featureTypes
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const preventBlur = useRef(false);

  useEffect(() => {
    handlers.setInputValue(value);
  }, [value]);

  const handleSuggestionClick = (suggestion: any) => {
    preventBlur.current = true;
    handlers.handleSuggestionClick(suggestion);
    setTimeout(() => {
      preventBlur.current = false;
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }, 100);
  };

  const handleInputBlur = (event: React.FocusEvent<unknown>) => {
    if (!preventBlur.current) {
      handlers.setSuggestions([]);
      onBlur?.(event);
    }
  };

  return (
    <div>
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={data.inputValue}
          name={name}
          onChange={handlers.handleInputChange}
          onBlur={handleInputBlur}
          autoComplete="new-password"
          aria-autocomplete="none"
          className="mb-1"
          ref={inputRef}
        />
        {data.isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        )}
        {data.suggestions.length > 0 && (
          <Card className="absolute z-50 w-full max-h-60 overflow-y-auto">
            {data.suggestions.map((item, index) => (
              <div
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                key={item.osm_id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSuggestionClick(item)}
              >
                <span className="p-2 flex text-sm">{item.display_name}</span>
                {index + 1 !== data.suggestions.length ? <Separator /> : null}
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

