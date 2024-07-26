"use client";
import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import OrderItem from "./OrderItem";
import { MdModeEdit } from "react-icons/md";
import Link from "next/link";

function ListProduct({ details = [] }) {
  return (
    <Box
      sx={{ p: 2, backgroundColor: "background.paper", borderRadius: "10px" }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Chi tiết đơn hàng
        </Typography>
        <Button
          variant="contained"
          LinkComponent={Link}
          href="/cart"
          sx={{
            height: "42px",
            fontWeight: 600,
            color: "common.white",
            backgroundColor: "secondary.main",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
          endIcon={<MdModeEdit size={18} />}
        >
          Sửa
        </Button>
      </Stack>
      <Stack>
        <Box
          sx={{
            mb: 1,
            borderBottom: "1px dashed",
            borderColor: "divider",
            pb: 1,
            display: { xs: "none", sm: "block" },
          }}
        >
          <Grid container spacing={1}>
            <Grid xs={6}>
              <Typography sx={{ fontWeight: 500, textAlign: "left" }}>
                Sản phẩm
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                Số lượng
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                Đơn giá
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                Tổng tiền
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            height: "auto",
            maxHeight: "calc(100vh - 60px - 100px)",
            overflow: "auto",
          }}
        >
          {details?.length > 0 ? (
            <>
              {details.map((detail) => {
                return <OrderItem key={detail._id} data={detail} />;
              })}
            </>
          ) : (
            <Typography sx={{ textAlign: "center" }}>
              Đơn hàng chưa có sản phẩm nào
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default ListProduct;
