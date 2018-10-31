import React from "react";
import socketIO from "socket.io-client";
import uniqid from "uniqid";
import styled from "styled-components";

import { Form, Input, Textarea, Button } from "../common";
import { closeModal, LOCAL_BACKEND_ENDPOINT } from "../../utils";
import { CREATE_CARD } from "../../events/event-names";
import { ButtonStyles } from "../styled";

const SubmitButton = styled(Button)`
  ${ButtonStyles};
`;

export default class CreateItemForm extends React.Component {
  state = {
    author: "",
    content: ""
  };

  handleAuthorChange = event => this.setState({ author: event.target.value });

  handleContentChange = event => this.setState({ content: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const socket = socketIO(LOCAL_BACKEND_ENDPOINT);
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
    this.setState({ author: "", content: "" });
    closeModal();
  };

  render() {
    const { author, content } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          className="input"
          type="text"
          label="Author"
          value={author}
          onChange={this.handleAuthorChange}
          placeholder="Your Name"
        />
        <Textarea
          label="Content"
          value={content}
          onChange={this.handleContentChange}
          placeholder="Your Feedback"
        />
        <SubmitButton type="submit" className="is-primary is-rounded">
          Submit
        </SubmitButton>
      </Form>
    );
  }
}
