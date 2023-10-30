import React from "react";
import { ToggleRetroBlurButton } from "./buttons/ToggleRetroBlurButton";
import { CreateColumnButton } from "./buttons/CreateColumnButton";
import { FlexBox } from "../../common/components/FlexBox";
import { ToggleRetroVotingButton } from "./buttons/ToggleRetroVotingButton";

export function RetroActionButtons() {
  return (
    <FlexBox flexDirection="row" p={1}>
      <CreateColumnButton />
      <ToggleRetroBlurButton />
      <ToggleRetroVotingButton />
    </FlexBox>
  );
}
