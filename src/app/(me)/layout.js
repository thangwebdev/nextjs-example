import React from "react";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Footer from "~/components/common/footer/Footer";
import Header from "~/components/common/header/Header";
import Sidebar from "./components/Sidebar";
import withAuth from "~/hocs/withAuth";

function MeLayout({ children }) {
  return (
    <>
      <Header />
      <Box sx={{ py: 2, backgroundColor: "background.default" }}>
        <Container>
          <Grid container spacing={2}>
            <Grid xs={12} md={3}>
              <Sidebar />
            </Grid>
            <Grid xs={12} md={9}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default withAuth(MeLayout);
