import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

function RequireExportBill() {
  return (
    <Box
      sx={{ p: 2, borderRadius: "10px", backgroundColor: "background.paper" }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Typography>
          Không xuất hóa đơn (Bạn có thể yêu cầu xuất hóa đơn khi đơn hàng chưa
          giao)
        </Typography>
        <Button
          variant="contained"
          sx={{ flexShrink: 0, color: "common.white" }}
        >
          Yêu cầu xuất hóa đơn
        </Button>
      </Stack>
    </Box>
  );
}

export default RequireExportBill;
