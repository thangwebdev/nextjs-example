import React from "react";
import { Box } from "@mui/material";
import Deliveries from "./components/Deliveries";

export const metadata = { title: "Thông tin giao hàng" };

function MyDeliveryPage() {
  return (
    <Box
      sx={{ p: 2, backgroundColor: "background.paper", borderRadius: "10px" }}
    >
      <Deliveries />
    </Box>
  );
}

export default MyDeliveryPage;
