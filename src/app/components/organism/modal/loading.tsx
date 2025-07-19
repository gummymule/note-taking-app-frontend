import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import Image from "next/image";

interface ModalLoadingProps {
  open: boolean;
  onClose?: () => void; // Optional, sometimes loading modals don't need a close
  description?: string;
}

export const ModalLoading: FC<ModalLoadingProps> = ({
  open,
  onClose,
  description = "Please wait...",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="loading-dialog-title"
      aria-describedby="loading-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          },
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        },
      }}
    >
      <DialogTitle>
        {onClose && (
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
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "grid",
          justifyItems: "center",
          alignItems: "center",
          gap: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <Image src="/loading-dots.gif" alt="modal-loading" width={70} height={70} priority />
        <div className="text-center text-sm">{description}</div>
      </DialogContent>
    </Dialog>
  );
};
