import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Button, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { IconFileJPG } from "../../atoms/icons/fileJPG";
import { IconFilePDF } from "../../atoms/icons/filePDF";
import { IconFileDocx } from "../../atoms/icons/fileDocx";
import { IconFileCSV } from "../../atoms/icons/fileCSV";
import { IconFile } from "../../atoms/icons/fileIcon";

interface FileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onSubmit?: (files: File[]) => void;
  errors?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label = "",
  accept = "*",
  multiple = false,
  maxSizeMB = 10,
  onSubmit,
  errors,
}) => {
  const { control } = useFormContext();
  const [fileList, setFileList] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const newFiles = multiple ? [...fileList, ...files] : files;
    setFileList(newFiles);
    if (onSubmit) {
      onSubmit(newFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    const newFiles = multiple ? [...fileList, ...files] : files;
    setFileList(newFiles);
  };

  const handleDeleteFile = (index: number, onChange: (files: File[]) => void) => {
    const updatedList = fileList.filter((_, i) => i !== index);
    setFileList(updatedList);
    onChange(updatedList);
  };

  const renderThumbnail = (file: File) => {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return (
        <IconFileJPG />
      );
    }

    if (fileType === "application/pdf") {
      return (
        <IconFilePDF />
      );
    }

    if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      return (
        <IconFileDocx />
      );
    }

    if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel"
    ) {
      return (
        <IconFileCSV />
      );
    }

    return (
      <IconFile />
    );
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field: { onChange } }) => (
          <>
            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(event) => {
                handleDrop(event);
                onChange(fileList); // Synchronize on drop
              }}
              sx={{
                border: `2px dashed ${dragging ? "#1976d2" : "#ccc"}`,
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                position: "relative",
                backgroundColor: dragging ? "#f0f8ff" : "#fafafa",
                cursor: "pointer",
                transition: "border-color 0.3s ease-in-out",
              }}
            >
              <CloudUploadIcon sx={{ fontSize: "40px", color: "#1976d2", mb: 1 }} />
              <div className="flex flex-col items-center">
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Drag & Drop <span style={{ fontWeight: "bold" }}>or</span>
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ textTransform: "none", mb: 1 }}
                >
                  Choose File
                  <input
                    type="file"
                    hidden
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => {
                      handleFileChange(e);
                      onChange(fileList); // Synchronize on file select
                    }}
                  />
                </Button>
                <Typography variant="caption">Max {maxSizeMB} MB</Typography>
              </div>
            </Box>

            {/* File List */}
            {fileList.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  File List:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    mt: 1,
                  }}
                >
                  {fileList.map((file, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100px",
                        height: "140px", // Increased height to accommodate the title
                        borderRadius: "8px",
                        overflow: "hidden",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f8f8",
                      }}
                    >
                      {renderThumbnail(file)}
                      <Typography
                        variant="caption"
                        sx={{
                          marginTop: "8px",
                          textAlign: "center",
                          wordWrap: "break-word",
                          padding: "0 4px",
                        }}
                      >
                        {file.name}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          color: "red",
                          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                        }}
                        onClick={() => handleDeleteFile(index, onChange)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </>
        )}
      />
      {errors && (
        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
          {errors}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
