import React from "react";
import { Box, Container } from "@mui/material";
import HeaderPc from "./HeaderPc";
import HeaderMobile from "./HeaderMobile";
import NavigationBar from "../navigation-bar/NavigationBar";

function Header() {
  return (
    <>
      <Box
        component="header"
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: "auto",
        }}
      >
        <Container sx={{ height: "100%", width: "100%" }}>
          {/* Header pc */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: { xs: "none", md: "block" },
            }}
          >
            <HeaderPc />
          </Box>
          {/* Header mobile */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: { xs: "block", md: "none" },
            }}
          >
            <HeaderMobile />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <NavigationBar />
      </Box>
    </>
  );
}

export default Header;
