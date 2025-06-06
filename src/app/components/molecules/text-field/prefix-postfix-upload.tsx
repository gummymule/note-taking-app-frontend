import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

interface TextFieldUploadProps {
  label?: string;
  helperText?: string;
  errors?: string;
  onFileChange?: (file: File | null) => void;
  accept?: string;
  value?: File | null;
}

export const TextFieldUpload: React.FC<TextFieldUploadProps> = ({
  label = "Upload File",
  helperText,
  errors,
  onFileChange,
  accept = "*",
  value = null,
}) => {
  const [fileName, setFileName] = useState(value?.name || "");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file?.name || "");
    if (onFileChange) {
      onFileChange(file);
    }
  };

  const handleClear = () => {
    setFileName("");
    if (onFileChange) {
      onFileChange(null);
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        variant="outlined"
        value={fileName}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <Button
              variant="contained"
              component="label"
              sx={{ ml: 2 }}
            >
              Browse
              <input
                type="file"
                hidden
                accept={accept}
                onChange={handleFileUpload}
              />
            </Button>
          ),
        }}
        fullWidth
        error={Boolean(errors)}
        helperText={errors || helperText}
      />
      {fileName && (
        <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" noWrap>
            Selected file: {fileName}
          </Typography>
          <Button
            variant="text"
            color="error"
            onClick={handleClear}
            sx={{ textTransform: "none" }}
          >
            Remove
          </Button>
        </Box>
      )}
    </Box>
  );
};
