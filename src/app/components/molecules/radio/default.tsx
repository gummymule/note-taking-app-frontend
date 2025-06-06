import React from "react";
import { Radio, FormControlLabel, FormHelperText, FormControl } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  className?: string;
  errors?: string;
}

const RadioButtonDefault: React.FC<RadioButtonProps> = ({
  name,
  value,
  label,
  className,
  errors,
}) => {
  const { control } = useFormContext();
  const {
    field: { value: fieldValue, onChange },
  } = useController({
    name,
    control,
    defaultValue: "", // Set initial value to empty (or any value to reset)
  });

  return (
    <FormControl error={!!errors} component="fieldset" className={className}>
      <FormControlLabel
        control={
          <Radio
            checked={fieldValue === value}
            onChange={() => onChange(value)} // Update form value
          />
        }
        label={label}
      />
      {errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default RadioButtonDefault;
