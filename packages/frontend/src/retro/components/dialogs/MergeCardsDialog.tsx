import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useFullscreen } from "../../hooks/useFullscreen";

interface MergeCardsDialogProps {
  open: boolean;
  closeDialog: () => void;
  onMergeCards: () => void;
}

export default function MergeCardsDialog({
  open,
  closeDialog,
  onMergeCards,
}: MergeCardsDialogProps) {
  const fullScreen = useFullscreen();

  function mergeCards() {
    onMergeCards();
    closeDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-merge-card-dialog"
      aria-describedby="alert-merge-card-dialog-description"
    >
      <DialogTitle id="alert-merge-card-dialog">{"Merge Cards?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-merge-card-dialog-description">
          You are about to merge cards!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={mergeCards} color="primary" autoFocus>
          Merge
        </Button>
      </DialogActions>
    </Dialog>
  );
}