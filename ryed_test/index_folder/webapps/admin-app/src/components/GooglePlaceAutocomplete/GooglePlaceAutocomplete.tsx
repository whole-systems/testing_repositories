import React, { FC, useEffect, useRef } from 'react';
import { Card } from '../ui/Card/Card';
import { Separator } from '../ui/Separator/Separator';
import { useGooglePlaceAutocomplete } from './hooks/useGooglePlaceAutocomplete';

import { Input } from '@/components/ui/Input/Input.tsx';
import { GoogleLocation } from '@/models/google';

interface Props {
  onChooseLocation: (location: GoogleLocation) => void;
  name?: string;
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<unknown>) => void;
  value: string;
}

export const GooglePlaceAutocomplete: FC<Props> = (props) => {
  const {
    onChooseLocation,
    placeholder = 'Search location',
    name,
    onBlur,
    value,
  } = props;
  const { data, handlers } = useGooglePlaceAutocomplete(onChooseLocation);

  const inputRef = useRef<HTMLInputElement>(null);
  const preventBlur = useRef(false);

  useEffect(() => {
    handlers.setInputValue(value);
  }, [value]);

  const handleSuggestionClick = (
    suggestion: google.maps.places.AutocompletePrediction
  ) => {
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
    if (!preventBlur.current && onBlur) {
      onBlur(event);
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
        {data.suggestions.length ? (
          <Card className="absolute z-50">
            {data.suggestions.map((item, index) => (
              <div
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                key={item.place_id}
                onMouseDown={(e) => e.preventDefault()} // Предотвращаем потерю фокуса
                onClick={() => handleSuggestionClick(item)}
              >
                <span className="p-2 flex">{item.description}</span>
                {index + 1 !== data.suggestions.length ? <Separator /> : null}
              </div>
            ))}
          </Card>
        ) : null}
        {data.suggestions.length ? (
          <div
            className="h-screen w-screen z-40 fixed top-0 left-0"
            onClick={() => {
              handlers.setSuggestions([]);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
