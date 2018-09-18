import React from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { HeaderContainer, BoardTitleStyles } from "../styles/styledComponents";
import { Title, Button } from "./common";
import CreateColumnForm from "./forms/CreateColumnForm";

import "../styles/Modal.css";

const BoardTitle = styled(Title)`
  ${BoardTitleStyles};
`;

export default class Header extends React.Component {
  state = { open: false };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  renderCreateColumnButton(boardEmpty) {
    if (boardEmpty) {
      return null;
    }

    return (
      <Button className="is-info is-rounded" onClick={this.onOpenModal}>
        <FontAwesomeIcon icon={faPlus} />
        &nbsp; Column
      </Button>
    );
  }

  render() {
    const { open } = this.state;
    const { title, columnsCount, boardEmpty } = this.props;

    return (
      <HeaderContainer>
        <BoardTitle className="is-4">{title}</BoardTitle>
        {this.renderCreateColumnButton(boardEmpty)}
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{ modal: "custom-modal" }}
        >
          <CreateColumnForm columnsCount={columnsCount} />
        </Modal>
      </HeaderContainer>
    );
  }
}