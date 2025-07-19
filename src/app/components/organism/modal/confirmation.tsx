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

interface ModalConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description: string;
  title?: string;
}

export const ModalConfirmation: FC<ModalConfirmationProps> = ({
  open,
  onClose,
  onConfirm,
  description,
  title = "Attention!",
  ...props
}) => {
  const handleConfirmClick = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
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
      <DialogTitle id="confirmation-dialog-title">
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
          src="/thumb-dialog-warning.svg"
          alt="Warning"
          width={120}
          height={120}
        />
        <div className="text-lg font-extrabold justify-self-center text-yellow-600">{title}</div>
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
            backgroundColor: "#9E9E9E", // abu-abu untuk "Tidak"
            width: "100%",
            borderRadius: "5px",
            textTransform: 'none',
            color: "#FFFFFF",
            border: "2px solid transparent",
            "&:hover": {
              backgroundColor: "#757575",
              border: "2px solid #9E9E9E",
            },
          }}
          onClick={onClose}
        >
          No
        </Button>
        <Button
          sx={{
            padding: "8px 0",
            backgroundColor: "#00529C", // biru untuk "Ya"
            width: "100%",
            borderRadius: "5px",
            textTransform: 'none',
            color: "#FFFFFF",
            border: "2px solid transparent",
            "&:hover": {
              backgroundColor: "#003f7d",
              border: "2px solid #00529C",
            },
          }}
          onClick={handleConfirmClick}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
