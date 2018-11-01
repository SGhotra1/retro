import React from "react";
import io from "socket.io-client";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  withStyles
} from "@material-ui/core";

import EditItemButton from "./EditItemButton";
import DeleteItemButton from "./DeleteItemButton";
import UpvoteItemButton from "./UpvoteItemButton";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { UNBLUR_CARD } from "../events/event-names";
import { CardWrapper, CardContainer, Unblur } from "./styled";

const unblur = (isBlurred, id, boardId) => {
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  socket.emit(UNBLUR_CARD, isBlurred, id, boardId);
};

const RetroItem = props => {
  const { classes, id, author, content, points, boardId, isBlurred } = props;

  return (
    <CardWrapper isBlurred={isBlurred}>
      <CardContainer>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} aria-label="Recipe">
                {points}
              </Avatar>
            }
            title={<Typography variant="subtitle2">{author}</Typography>}
          />
          <CardContent>
            <Typography variant="subtitle1">{content}</Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <EditItemButton
              id={id}
              author={author}
              content={content}
              boardId={boardId}
            />
            <DeleteItemButton id={id} boardId={boardId} />
            <UpvoteItemButton id={id} boardId={boardId} />
          </CardActions>
        </Card>
      </CardContainer>

      {isBlurred ? (
        <Unblur>
          <IconButton
            color="secondary"
            onClick={() => unblur(!isBlurred, id, boardId)}
          >
            <EyeIcon fontSize="small" />
          </IconButton>
        </Unblur>
      ) : null}
    </CardWrapper>
  );
};

const styles = {
  avatar: {
    color: "#fff",
    backgroundColor: "#ff4081"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  card: {
    border: "1px solid lightgrey"
  }
};

export default withStyles(styles)(RetroItem);
