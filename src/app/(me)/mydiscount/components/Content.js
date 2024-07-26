"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Discount from "~/components/common/discount/Discount";
import Image from "next/image";
import { useAppContext } from "~/contexts/ContextProvider";
import moment from "moment";
import { asyncGetList } from "~/utils/httpRequest";

function Content() {
  const { cart, customer } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState([]);

  const getDiscounts = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const dateCompare = moment().seconds(0).milliseconds(0);
      const resp = await asyncGetList({
        apiCode: "dmchietkhau",
        condition: {
          page: 1,
          limit: 99999,
          q: {
            $and: [
              { status: true },
              { "exfields.loai_chiet_khau": 1 },
              {
                hieu_luc_tu: { $lte: dateCompare },
                hieu_luc_den: { $gte: dateCompare },
              },
              {
                $or: [
                  {
                    ma_kh: customer?.ma_kh || "",
                    nh_kh: customer?.nh_kh || "",
                  },
                  {
                    ma_kh: customer?.ma_kh || "",
                  },
                  {
                    nh_kh: customer?.nh_kh || "",
                  },
                  {
                    ma_kh: "",
                    nh_kh: "",
                  },
                ],
              },
            ],
          },
        },
      });
      if (resp.status === 200) {
        setDiscounts(resp.data);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message ||
            resp.data.error ||
            "Lỗi khi lấy thông tin giảm giá",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderLoading = () => {
    return (
      <Stack gap={2}>
        {new Array(2).fill(0).map((_, index) => (
          <Stack key={index} direction="row" justifyContent="space-between">
            <Stack sx={{ width: "60%" }}>
              <Skeleton variant="text" animation="wave" sx={{ width: "50%" }} />
              <Skeleton variant="text" animation="wave" sx={{ width: "80%" }} />
            </Stack>
            <Box sx={{ width: "15%" }}>
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ width: "100%", height: "40px" }}
              />
            </Box>
          </Stack>
        ))}
      </Stack>
    );
  };

  const tienHang = useMemo(() => {
    const result = (cart || [])
      .filter((item) => item.status)
      .reduce((acc, item) => {
        return acc + item.sl_xuat * item.gia_ban_le;
      }, 0);
    return result;
  }, [cart]);

  useEffect(() => {
    getDiscounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.ma_kh]);

  return (
    <Box
      sx={{ p: 2, backgroundColor: "background.paper", borderRadius: "10px" }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Image src="/discount.png" alt="Discount" width={30} height={30} />
        <Typography variant="h5">Mã giảm giá dành cho bạn</Typography>
      </Stack>
      <Box sx={{ mt: 2 }}>
        {loading ? (
          renderLoading()
        ) : (
          <>
            {!discounts || discounts?.length <= 0 ? (
              <Typography textAlign="center">
                Không tìm thấy mã giảm giá
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {discounts.map((discount) => {
                  return (
                    <Grid key={discount._id} xs={12} sm={6}>
                      <Discount data={discount} tienHang={tienHang} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Content;
