import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Link from "next/link";
import { generateLinkImage, numeralCustom } from "~/utils/helpers";

function Details({ details = [] }) {
  return (
    <Stack
      gap={2}
      sx={{ p: 2, backgroundColor: "background.paper", borderRadius: "10px" }}
    >
      <Typography variant="h5">Chi tiết đơn hàng (3)</Typography>
      <Box>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            // borderBottom: "1px dashed",
            // borderColor: "divider",
            // pb: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid sm={5}>
              <Typography sx={{ fontWeight: 500 }}>Sản phẩm</Typography>
            </Grid>
            <Grid sm={1.75}>
              <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                Số lượng
              </Typography>
            </Grid>
            <Grid sm={1.75}>
              <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                Giá gốc
              </Typography>
            </Grid>
            <Grid sm={1.75}>
              <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                Đơn giá
              </Typography>
            </Grid>
            <Grid sm={1.75}>
              <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                Tiền hàng
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          className="hidden-scroll"
          sx={{ py: 2, maxHeight: "80vh", overflow: "auto" }}
        >
          {details?.length > 0 &&
            details.map((detail) => {
              return (
                <Box
                  key={detail._id}
                  sx={{
                    borderTop: "1px dashed",
                    borderColor: "divider",
                    py: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={5}>
                      <Stack direction="row" alignItems="flex-start" gap={2}>
                        <Image
                          src={
                            detail?.picture
                              ? generateLinkImage(detail.picture)
                              : "/no_thumbnail.png"
                          }
                          alt="product image"
                          width={60}
                          height={60}
                        />
                        <Stack>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              color: "text.primary",
                            }}
                          >
                            {`${detail?.ten_vt} (${detail?.ma_dvt})`}
                          </Typography>
                          <Typography>
                            Hộp 6 vỉ x 10 viên nén bao phim
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid xs={6} sm={1.75}>
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{ display: { xs: "inline", sm: "none" } }}
                        >
                          SL:{" "}
                        </Typography>
                        <Typography component="span">
                          {detail?.sl_xuat || 0}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={1.75}>
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{ display: { xs: "inline", sm: "none" } }}
                        >
                          Giá gốc:{" "}
                        </Typography>
                        <Typography component="span">
                          {numeralCustom(detail?.gia_ban_le_goc || 0).format()}{" "}
                          đ
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={1.75}>
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{ display: { xs: "inline", sm: "none" } }}
                        >
                          Đơn giá:{" "}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{ color: "primary.main", fontWeight: 500 }}
                        >
                          {numeralCustom(detail?.gia_ban || 0).format()} đ
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={1.75}>
                      <Typography
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{ display: { xs: "inline", sm: "none" } }}
                        >
                          Tiền hàng:{" "}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{ fontWeight: 600, color: "error.main" }}
                        >
                          {numeralCustom(detail?.tien_xuat || 0).format()} đ
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Stack>
  );
}

export default Details;
