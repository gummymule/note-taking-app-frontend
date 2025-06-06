import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormHelperText } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { TextLabel } from '../../atoms/typographies/label';

interface HookFormDatePickerProps {
  name: string;
  label?: string;
  errors?: string;
  className?: string;
}

const DatePickerDefault: React.FC<HookFormDatePickerProps> = ({
  name,
  label,
  errors,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <div className={`${className}`}>
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={field.value ? dayjs(field.value) : null}
              onChange={(date: Dayjs | null) => {
                field.onChange(date ? date.toDate() : null); // Ensure Date is sent
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors,
                  helperText: errors,
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
      {errors && <FormHelperText error>{errors}</FormHelperText>}
    </div>
  );
};

export default DatePickerDefault;
