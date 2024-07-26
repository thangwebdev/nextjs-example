import React from "react";
import { Stack } from "@mui/material";
import Logo from "./Logo";
import Actions from "./Actions";
import SidebarMobile from "./SidebarMobile";
import SearchProduct from "./SearchProduct";

function HeaderMobile() {
  return (
    <Stack
      sx={{
        py: 1,
        height: "100%",
      }}
      spacing={1}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Logo />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Actions />
          <SidebarMobile />
        </Stack>
      </Stack>
      {/* <Search /> */}
      <SearchProduct />
    </Stack>
  );
}

export default HeaderMobile;
