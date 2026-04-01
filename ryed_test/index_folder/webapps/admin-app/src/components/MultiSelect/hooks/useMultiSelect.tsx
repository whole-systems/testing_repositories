import { useCallback, useState, useEffect } from 'react';

interface Value {
  label: string;
  value: string;
}

interface HookProps {
  data: Value[];
  onChange: (data: Value[]) => void;
  inputSearch: boolean;
  initialSelected?: Value[];
}

export const useMultiSelect = (props: HookProps) => {
  const { data: initialData, onChange, initialSelected = [] } = props;
  const [selectedValues, setSelectedValues] = useState<Value[]>(
    initialSelected ?? []
  );
  const [openValuesMenu, setOpenValuesMenu] = useState(false);
  const [availableValues, setAvailableValues] = useState<Value[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    if (initialSelected.length) {
      setSelectedValues(initialSelected);
    }
  }, [initialSelected]);

  const setNewAvailableData = useCallback(
    (values: Value[]) => {
      setAvailableValues(() =>
        initialData.filter(
          (item) => !values.some((selected) => selected.value === item.value)
        )
      );
    },
    [initialData]
  );

  const toggleValuesMenu = useCallback(() => {
    setOpenValuesMenu((state) => {
      if (!state) {
        setSearchInputValue('');
        setNewAvailableData(selectedValues);
      }
      return !state;
    });
  }, [selectedValues, setNewAvailableData]);

  // useEffect(() => {
  //   if (!props.inputSearch && initialData.length) {
  //     setSelectedValues(initialData);
  //   }
  // }, [initialData, props.inputSearch]);

  const handleSelect = useCallback(
    (data: Value) => {
      const newSelectedValues = [...selectedValues, data];
      setSelectedValues(newSelectedValues);
      setNewAvailableData(newSelectedValues);
      onChange(newSelectedValues);
      setSearchInputValue('');
    },
    [onChange, selectedValues, setNewAvailableData]
  );

  const handleUnSelect = useCallback(
    (data: Value) => {
      const newSelectedValues = selectedValues.filter(
        (f) => f.value !== data.value
      );
      setSelectedValues(newSelectedValues);
      setNewAvailableData(newSelectedValues);
      onChange(newSelectedValues);
    },
    [onChange, selectedValues, setNewAvailableData]
  );

  const handleInputSearch = useCallback(
    (value: string) => {
      setSearchInputValue(value);
      if (!value) {
        setNewAvailableData(selectedValues);
        return;
      }
      setAvailableValues((state) =>
        state.filter((item) =>
          item.label.toLowerCase().includes(value.toLowerCase())
        )
      );
    },
    [selectedValues, setNewAvailableData]
  );

  const resetSelected = useCallback(() => {
    setSelectedValues([]);
    setAvailableValues(initialData);
    onChange([]);
  }, [initialData, onChange]);
  // const availableValues = initialData.filter(
  //   (item) => !selectedValues.some((selected) => selected.value === item.value)
  // );

  return {
    data: { selectedValues, availableValues, openValuesMenu, searchInputValue },
    handlers: {
      handleUnSelect,
      handleSelect,
      setOpenValuesMenu,
      handleInputSearch,
      toggleValuesMenu,
      resetSelected,
    },
  };
};
