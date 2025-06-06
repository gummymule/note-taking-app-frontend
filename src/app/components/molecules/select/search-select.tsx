/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import { TextLabel } from '../../atoms/typographies/label';

interface SearchSelectProps {
  name: string;
  control: any;
  label?: string;
  options: { label: string; value: string | number }[];
  errors?: string;
  placeholder?: string;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  name,
  control,
  label,
  options,
  errors,
  placeholder,
}) => {

  return (
    <FormControl fullWidth error={!!errors} >
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label || ''}
            value={options.find((opt) => opt.value === value) || null}
            onChange={(_, newValue) => {
              onChange(newValue ? newValue.value : '');
            }}
            isOptionEqualToValue={(option, selected) => option.value === selected?.value}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                error={!!errors}
                fullWidth
              />
            )}
          />
        )}
      />
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>

  );
};

export default SearchSelect;
