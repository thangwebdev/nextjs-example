import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { generateLinkImage, numeralCustom } from "~/utils/helpers";

function OrderItem({ data }) {
  return (
    <Box sx={{ borderBottom: "1px dashed", borderColor: "divider", py: 1 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }} width="100%">
        <Grid xs={3} sm={1.5}>
          <Image
            src={
              data?.picture
                ? generateLinkImage(data.picture)
                : "/no_thumbnail.png"
            }
            alt="product image"
            width={80}
            height={80}
            priority
            quality={100}
            style={{ width: "100%", height: "auto", maxHeight: "80px" }}
          />
        </Grid>
        <Grid xs={9} sm={4.5}>
          <Stack>
            <Typography>{data?.ten_vt}</Typography>
            {data?.quy_cach && (
              <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                {data?.quy_cach}
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid xs={4} sm={2}>
          <Typography
            sx={{ textAlign: "center", display: { xs: "none", sm: "block" } }}
          >
            {data?.sl_xuat || 0}
          </Typography>
          <Typography
            sx={{ textAlign: "center", display: { xs: "block", sm: "none" } }}
          >
            Số lượng: {data?.sl_xuat || 0}
          </Typography>
        </Grid>
        <Grid xs={4} sm={2}>
          <Typography sx={{ textAlign: "center" }}>
            {numeralCustom(data?.gia_ban_nt || 0).format()}
          </Typography>
        </Grid>
        <Grid xs={4} sm={2}>
          <Typography
            sx={{ textAlign: "center", fontWeight: 600, color: "error.main" }}
          >
            {numeralCustom(
              (data?.gia_ban_nt || 0) * (data?.sl_xuat || 0)
            ).format()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderItem;
