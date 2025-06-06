/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';
import { TextLabel } from '../../atoms/typographies/label';

interface SelectDefaultProps {
  name: string;
  control: any;
  label?: string;
  options: { label: string; value: string | number }[];
  errors?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SelectDefault: React.FC<SelectDefaultProps> = ({
  name,
  control,
  label,
  options,
  errors,
  onChange,
  className,
}) => {

  return (
    <FormControl fullWidth error={!!errors} margin="normal">
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            className={className}
            value={field.value !== undefined ? field.value : ""}
            onChange={(event) => {
              field.onChange(event);
              if (onChange) {
                onChange(event as React.ChangeEvent<HTMLInputElement>);
              }
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default SelectDefault;
