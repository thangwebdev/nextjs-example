import React from "react";
import { Box, Container } from "@mui/material";
import NavigatePage from "~/components/ui/navigate-page/NavigatePage";
import withAuth from "~/hocs/withAuth";
import Content from "./components/Content";

export const metadata = { title: "Đặt hàng" };

function OrderPage() {
  return (
    <Box sx={{ py: 2, backgroundColor: "background.default" }}>
      <Container>
        <Box mb={1}>
          <NavigatePage
            previousURLs={[
              { name: "Trang chủ", path: "/" },
              { name: "Giỏ hàng", path: "/cart" },
            ]}
            currentPageName="Đặt hàng"
          />
        </Box>
        <Content />
      </Container>
    </Box>
  );
}

export default withAuth(OrderPage);
