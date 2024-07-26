import React from "react";
import { Box, Stack } from "@mui/material";
import Notification from "./Notification";
import User from "./User";
import Cart from "./Cart";
import { cookies } from "next/headers";
import ActionUnAuthen from "./ActionUnAuthen";

function Actions() {
  const cookieStore = cookies();

  if (!cookieStore.get("token")?.value) {
    return <ActionUnAuthen />;
  }

  return (
    <Box>
      {/* PC */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Cart />
        <Notification />
        <User />
      </Stack>
      {/* Mobile */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Notification />
        <Cart />
      </Stack>
    </Box>
  );
}

export default Actions;
