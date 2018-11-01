import React from "react";
import io from "socket.io-client";
import uniqid from "uniqid";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { CREATE_CARD } from "../events/event-names";

class CreateItemButton extends React.Component {
  state = {
    open: false,
    author: "",
    content: ""
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleAuthorChange = e => this.setState({ author: e.target.value });

  handleContentChange = e => this.setState({ content: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const socket = io(LOCAL_BACKEND_ENDPOINT);
    const { author, content } = this.state;
    const { columnId, boardId } = this.props;
    const id = uniqid("item-");
    const newCard = {
      id,
      author,
      content,
      isBlurred: true,
      points: 0
    };

    socket.emit(CREATE_CARD, newCard, columnId, boardId);
    this.setState({ author: "", content: "", open: false });
  };

  render() {
    const { open, author, content } = this.state;

    return (
      <>
        <IconButton color="secondary" onClick={this.handleOpen}>
          <AddIcon fontSize="small" />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="new-card-dialog"
        >
          <DialogTitle id="new-card-dialog">New Card</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="author-name"
              label="Author"
              type="text"
              value={author}
              onChange={this.handleAuthorChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="content-name"
              label="Content"
              type="text"
              value={content}
              onChange={this.handleContentChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default CreateItemButton;
