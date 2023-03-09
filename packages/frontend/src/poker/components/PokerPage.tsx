import React, { useEffect, useState } from "react";
import { Grid, Snackbar, useTheme } from "@mui/material";
import { Navigate } from "react-router-dom";

import PokerHeader from "./PokerHeader";
import PokerActionButtons from "./PokerActionButtons";
import PokerTitle from "./PokerTitle";
import PokerUsers from "./PokerUsers";

import PokerStats from "./PokerStats";
import { useErrorContext } from "../../common/context/ErrorContext";
import { usePokerContext } from "../context/PokerContext";
import { isWaitingUser } from "../../common/utils/participantsUtils";
import { useUserContext } from "../../common/context/UserContext";
import { WaitingForApproval } from "../../common/components/WaitingForApproval";
import { useRoomIdFromPath } from "../../common/hooks/useRoomIdFromPath";
import Alert from "../../common/components/Alert";
import { useFirstWaitingUser } from "../../common/components/useFirstWaitingUser";

export default function PokerPage() {
  const { pokerState, resetPokerState } = usePokerContext();
  const { user, resetUser } = useUserContext();
  const { error } = useErrorContext();
  const roomIdFromPath = useRoomIdFromPath();
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useFirstWaitingUser({ waitingList: pokerState.waitingList, onFirstUserWaiting: showSnackbar });

  useEffect(() => {
    if (!roomIdFromPath) {
      resetUser();
      resetPokerState();
    }
  }, [roomIdFromPath, resetUser, resetPokerState]);

  useEffect(() => {
    document.title = "Retro | Planning Poker";

    return () => {
      document.title = "Retro";
    };
  });

  function showSnackbar() {
    setSnackbarOpen(true);
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  if (error) return <Navigate to={"/error"} />;

  if (isWaitingUser(pokerState.waitingList, user.id))
    return (
      <>
        <PokerHeader />
        <WaitingForApproval />
      </>
    );

  return (
    <>
      <PokerHeader />
      <Grid container sx={{ flexGrow: 1 }} direction="column" justifyContent="space-between">
        <PokerActionButtons />
        <Grid item xs={12}>
          <PokerTitle />
        </Grid>
        <Grid item xs={12}>
          <PokerUsers />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: theme.spacing(2) }}>
          {pokerState.showResults ? <PokerStats /> : null}
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <div>
          <Alert onClose={handleCloseSnackbar} severity="info">
            There is a new participant waiting to be accepted.
          </Alert>
        </div>
      </Snackbar>
    </>
  );
}