import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import Image from "next/image";

interface ModalSuccessProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description: string;
  title?: string;
}

export const ModalSuccess: FC<ModalSuccessProps> = ({
  open,
  onClose,
  onConfirm,
  description,
  title = "Yeay!",
  ...props
}) => {
  const handleButtonClick = () => {
    onConfirm(); // Only call `onConfirm` once.
    onClose(); // Close the modal after confirmation.
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "350px",
          },
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        },
      }}
      {...props}
    >
      <DialogTitle id="alert-dialog-title">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        <Image className="mx-auto justify-center py-3" src="/thumb-success-dialog.svg" alt="Success" width={120} height={120} />
        <div className="text-lg font-extrabold justify-self-center">{title}</div>
        <div className="text-center mt-4">{description}</div>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          columnGap: "0.5rem",
          padding: "0 1.5rem 1.5rem",
        }}
      >
        <Button
          sx={{
            padding: "8px 0",
            backgroundColor: "#00529C",
            width: "100%",
            borderRadius: "5px",
            color: "#FFFFFF",
            border: "2px solid transparent", // Initial transparent border
            "&:hover": {
              backgroundColor: "#004080", // Darker blue for hover background
              border: "2px solid #00529C", // Blue border on hover
            },
          }}
          onClick={handleButtonClick}
          autoFocus
        >
          Oke
        </Button>
      </DialogActions>
    </Dialog>
  );
};
