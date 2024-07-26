"use client";
import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { GoClock } from "react-icons/go";
import moment from "moment";
import Link from "next/link";
import { numeralCustom } from "~/utils/helpers";

function OrderItem({ order }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderRadius: "10px",
        border: "1px dashed",
        borderColor: "divider",
      }}
    >
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid xs={12} sm={6} md={6}>
          <Stack>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography
                component={Link}
                href={`/myorder/${order?._id}`}
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "primary.main",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                #{order?.so_ct}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{ height: "100%" }}
              >
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: order?.color2 || "error.main",
                  }}
                ></Box>
                <Typography sx={{ color: "text.primary" }}>
                  {order?.ten_trang_thai2}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap={0.5}
              sx={{ color: "text.secondary" }}
            >
              <GoClock size={16} />
              <Typography
                sx={{
                  fontWeight: 400,
                  color: "text.secondary",
                }}
              >
                {moment(order?.ngay_ct)
                  .format("DD-MM-YYYY HH:mm:ss")
                  .toString()}
              </Typography>
            </Stack>
            <Typography sx={{ color: "text.primary" }}>
              Không yêu cầu xuất hóa đơn
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={12} sm={3} md={4}>
          <Stack>
            <Typography variant="h6" color="error">
              {numeralCustom(order?.t_tt_nt || 0).format()}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "text.primary" }}>
              Sản phẩm {order?.details?.length || 0} - Số lượng{" "}
              {order?.t_sl || 0}
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={12} sm={3} md={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Button
              variant="text"
              LinkComponent={Link}
              href={`/myorder/${order?._id}`}
              sx={{
                width: { xs: "100%", sm: "unset" },
                height: "42px",
                fontWeight: 600,
              }}
            >
              Xem chi tiết
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderItem;
