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

interface ModalErrorProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description: string;
  title?: string;
}

export const ModalError: FC<ModalErrorProps> = ({
  open,
  onClose,
  onConfirm,
  description,
  title = "Oops!",
  ...props
}) => {
  const handleButtonClick = () => {
    onConfirm();
    onClose();
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
        <Image
          className="mx-auto justify-center py-3"
          src="/thumb-error-dialog.svg"
          alt="Error"
          width={120}
          height={120}
        />
        <div className="text-lg font-extrabold justify-self-center text-red-600">{title}</div>
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
            backgroundColor: "#D32F2F", // red tone
            width: "100%",
            borderRadius: "5px",
            color: "#FFFFFF",
            border: "2px solid transparent",
            "&:hover": {
              backgroundColor: "#B71C1C",
              border: "2px solid #D32F2F",
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
