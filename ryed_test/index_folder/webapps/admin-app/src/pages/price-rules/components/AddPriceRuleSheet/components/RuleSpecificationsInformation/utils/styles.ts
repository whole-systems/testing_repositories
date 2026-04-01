export const timePickerStyles = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.375rem',
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--input))',
    '& fieldset': {
      border: 'none',
    },
    '&:focus-within': {
      outline: 'none',
      boxShadow: '0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring))',
    },
  },
  '& .MuiInputBase-input': {
    height: '36px',
    padding: '0 0.75rem',
    fontSize: '0.875rem',
    color: 'hsl(var(--foreground))',
    '&::placeholder': {
      color: 'hsl(var(--muted-foreground))',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  '& .MuiInputAdornment-root': {
    display: 'none',
  },
};
