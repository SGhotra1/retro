import React, { useState } from "react";
import nanoid from "nanoid";
import AddIcon from "@material-ui/icons/Add";
import { compose } from "recompose";
import { Redirect } from "react-router-dom";
import {
  Button,
  Fab,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  withMobileDialog,
  withStyles
} from "@material-ui/core";

import { connectSocket } from "../../utils";
import { CREATE_BOARD } from "../../utils/eventNames";
import { defaultBoard, validateInput } from "../../utils";
import {
  BOARD_NAME_EMPTY_MSG,
  BOARD_NAME_TOO_LONG_MSG
} from "../../utils/errorMessages";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

function CreateBoardDialog(props) {
  const { classes, fullScreen } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [boardId, setBoardId] = useState("");
  const input = validateInput(title.length, 0, 40);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function triggerRedirect() {
    setOpen(false);
    setTitle("");
    setBoardId(boardId);
  }

  function handleSubmit() {
    const boardId = nanoid();
    const socket = connectSocket(boardId);
    const newBoard = { ...defaultBoard, boardId, title };

    socket.emit(CREATE_BOARD, newBoard, boardId);
    triggerRedirect();
  }

  function renderError() {
    const { isEmpty, isTooLong } = input;
    if (isEmpty || isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {isEmpty ? BOARD_NAME_EMPTY_MSG : BOARD_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  if (boardId) {
    return <Redirect to={`/boards/${boardId}`} />;
  }

  return (
    <>
      <Fab
        size="medium"
        variant="extended"
        color="primary"
        onClick={openDialog}
        className={classes.button}
        data-testid="new-board-btn"
      >
        <AddIcon className={classes.icon} />
        New Board
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a name for your new board.
          </DialogContentText>
          <TextField
            required
            error={!input.isValid}
            autoFocus
            margin="dense"
            id="board-name"
            label="Board Name"
            type="text"
            value={title}
            onChange={handleTitleChange}
            fullWidth
            autoComplete="off"
          />
          {renderError()}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!input.isValid}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default compose(
  withMobileDialog(),
  withStyles(styles)
)(CreateBoardDialog);
