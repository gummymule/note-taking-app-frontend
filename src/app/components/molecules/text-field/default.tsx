/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { TextField } from '@mui/material';
import { Controller, RegisterOptions } from 'react-hook-form';
import { TextLabel } from '../../atoms/typographies/label';

type HookFormTextFieldProps = {
  name: string;
  control: any;
  label?: string;
  variant?: "outlined" | "filled" | "standard";
  rows?: number;
  defaultValue?: string;
  value?: any;
  placeholder?: string;
  className?: string;
  errors?: string;
  type?: string;
  rules?: RegisterOptions; // ✅ Add rules prop
};

const TextFieldDefault: React.FC<HookFormTextFieldProps> = ({
  name,
  control,
  label,
  variant = "outlined",
  rows = 1,
  defaultValue = '',
  placeholder,
  className,
  errors,
  type,
  rules, // ✅ Destructure rules
  ...restProps
}) => {

  return (
    <div className={className}>
      {label && <TextLabel>{label}</TextLabel>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules} // ✅ Pass rules to Controller
        render={({ field }) => (
          <TextField
            {...field}
            variant={variant}
            multiline={rows > 1}
            rows={rows}
            error={!!errors}
            helperText={errors || ''}
            fullWidth
            type={type}
            placeholder={placeholder}
            {...restProps}
          />
        )}
      />
    </div>
  );
};

export default TextFieldDefault;
