import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TextLabel } from '../../atoms/typographies/label';

type HookFormRadioButtonProps = {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  className?: string;
  errors?: string; // Add optional errors prop
};

const RadioButtonHorizontal: React.FC<HookFormRadioButtonProps> = ({
  name,
  label,
  options,
  required = false,
  className,
  errors,
}) => {
  const { control } = useFormContext();

  return (
    <div className={`${className}`}>
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={options[0]?.value || ''}
        render={({ field }) => (
          <FormControl component="fieldset" error={!!errors} required={required} fullWidth>
            <RadioGroup {...field} row>
              {options.map((option) => (
                <div
                  key={option.value}
                  className="border rounded-md px-4 py-2 flex justify-center mr-4 hover:shadow-md"
                >
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                </div>
              ))}
            </RadioGroup>
            {errors && <FormHelperText>{errors}</FormHelperText>}
          </FormControl>
        )}
      />
    </div>
  );
};

export default RadioButtonHorizontal;
