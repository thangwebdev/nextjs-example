import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Delivery from "~/components/common/delivery/Delivery";

function Info({ order }) {
  return (
    <Stack
      gap={1}
      sx={{
        p: 2,
        height: "100%",
        backgroundColor: "background.paper",
        borderRadius: "10px",
      }}
    >
      {/* Top */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          borderBottom: "1px dashed",
          borderColor: "divider",
          pb: 1,
        }}
      >
        <Typography variant="h5">Đơn hàng #{order.so_ct}</Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: order?.color2,
            }}
          ></Box>
          <Typography>{order?.ten_trang_thai2}</Typography>
        </Stack>
      </Stack>
      {/* Delivery info */}
      <Stack
        gap={1}
        sx={{
          borderBottom: "1px dashed",
          borderColor: "divider",
          pb: 1,
        }}
      >
        <Typography variant="h6">Thông tin giao hàng</Typography>
        <Delivery data={order?.exfileds?.thong_tin_giao_hang} />
      </Stack>
      {/* Payment method */}
      <Stack gap={1}>
        <Typography variant="h6">Phương thức thanh toán</Typography>
        <Typography>{order?.ten_pt_thanh_toan}</Typography>
      </Stack>
      {/* Note */}
      <Stack gap={1}>
        <Typography variant="h6">Ghi chú</Typography>
        <Typography>{order?.dien_giai}</Typography>
      </Stack>
    </Stack>
  );
}

export default Info;
