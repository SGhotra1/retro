import React from "react";
import { Add } from "@mui/icons-material";
import { RetroColumn } from "../../../types/retroTypes";
import CreateCardDialog from "../../dialogs/CreateCardDialog";
import { useDialog } from "../../../hooks/useDialog";
import TooltipIconButton from "../../../../common/TooltipIconButton";

interface CreateCardButtonProps {
  column: RetroColumn;
}

export default function CreateCardButton({ column }: CreateCardButtonProps) {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <TooltipIconButton tooltipText="Create Card" color="inherit" onClick={openDialog}>
        <Add fontSize="small" />
      </TooltipIconButton>
      <CreateCardDialog isOpen={isOpen} close={closeDialog} columnIndex={column.index} />
    </>
  );
}
