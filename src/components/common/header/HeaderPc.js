import { Box, Stack } from "@mui/material";
import React from "react";
import Actions from "./Actions";
import Logo from "./Logo";
import SearchProduct from "./SearchProduct";

function HeaderPc() {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      spacing={1}
      sx={{
        py: 1,
        height: "100%",
      }}
    >
      {/* Logo */}
      <Logo />
      {/* Search */}
      <Box
        sx={{
          maxWidth: "800px",
          width: "50%",
        }}
      >
        <SearchProduct />
      </Box>
      {/* Actions */}
      <Actions />
    </Stack>
  );
}

export default HeaderPc;
