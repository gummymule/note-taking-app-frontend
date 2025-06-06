/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  Chip,
  Checkbox,
  ListItemText,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { TextLabel } from '../../atoms/typographies/label';

interface MultiSelectWithChipsProps {
  name: string;
  control: any
  label?: string;
  options: { label: string; value: string | number }[];
  errors?: string;
}

const MultiSelectWithChips: React.FC<MultiSelectWithChipsProps> = ({
  name,
  control,
  label,
  options,
  errors,
}) => {

  return (
    <FormControl fullWidth error={!!errors} margin="normal">
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            {...field}
            multiple
            value={field.value || []} 
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {selected.map((value: string | number) => (
                  <Chip
                    key={value}
                    label={options.find((option) => option.value === value)?.label}
                  />
                ))}
              </div>
            )}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={field.value?.includes(option.value)} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default MultiSelectWithChips;
