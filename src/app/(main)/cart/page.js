import React from "react";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import List from "./components/List";
import Total from "./components/Total";
import NavigatePage from "~/components/ui/navigate-page/NavigatePage";
import withAuth from "~/hocs/withAuth";

export const metadata = { title: "Giỏ hàng" };

function CartPage() {
  return (
    <Box sx={{ py: 1, backgroundColor: "background.default" }}>
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid xs={12} md={8.5}>
              <Box mb={1}>
                <NavigatePage
                  previousURLs={[{ name: "Trang chủ", path: "/" }]}
                  currentPageName="Giỏ hàng"
                />
              </Box>
              <List />
            </Grid>
            <Grid xs={12} md={3.5}>
              <Total />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
export default withAuth(CartPage);
