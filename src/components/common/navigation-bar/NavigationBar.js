import React from "react";
import { Box, Container, Stack } from "@mui/material";
import NavItem from "./NavItem";
import { NAVBARS } from "~/utils/ui-constants";

function NavigationBar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "35px",
        backgroundColor: "background.paper",
        boxShadow: "0px 1px 5px 1px #00000022",
      }}
    >
      <Container sx={{ height: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ height: "100%" }}
        >
          {NAVBARS.map((nav) => {
            return (
              <NavItem key={nav.name} href={nav.href} subs={nav.subs}>
                {nav.name}
              </NavItem>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}

export default NavigationBar;
