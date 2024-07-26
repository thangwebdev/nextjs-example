"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Skeleton, Typography } from "@mui/material";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import DialogBase from "~/components/ui/dialog/DialogBase";
import { Stack } from "@mui/system";
import { MdClose } from "react-icons/md";
import Discount from "~/components/common/discount/Discount";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncGetList } from "~/utils/httpRequest";
import moment from "moment";

function Discounts({ tienHang = 0 }) {
  const { customer, showAlert } = useAppContext();
  const [openDiscount, setOpenDiscount] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpenDiscount(false);

  const currentDiscount = customer?.exfields?.dmchietkhau;

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

  useEffect(() => {
    if (openDiscount && customer?.ma_kh) {
      getDiscounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.ma_kh, openDiscount]);

  return (
    <>
      <DialogBase
        open={openDiscount}
        onClose={handleClose}
        renderTitle={() => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Typography variant="h5">Mã giảm giá của bạn</Typography>
            <IconButton onClick={handleClose}>
              <MdClose size={20} />
            </IconButton>
          </Stack>
        )}
        width="600px"
        content={
          loading ? (
            renderLoading()
          ) : (
            <Stack gap={2}>
              {discounts?.length > 0 ? (
                discounts.map((discount) => {
                  return (
                    <Discount
                      key={discount._id}
                      data={discount}
                      tienHang={tienHang}
                    />
                  );
                })
              ) : (
                <Typography textAlign="center">
                  Không tìm thấy mã giảm giá
                </Typography>
              )}
            </Stack>
          )
        }
        actions={[
          <Typography
            key={1}
            sx={{
              width: "100%",
              textAlign: "center",
              color: "primary.main",
              fontWeight: 600,
            }}
          >
            Lưu ý: Mỗi đơn hàng chỉ áp dụng được một mã giảm giá
          </Typography>,
        ]}
      />
      <Stack gap={2}>
        <Button
          variant="contained"
          onClick={() => setOpenDiscount(true)}
          sx={{
            fontWeight: 600,
            color: "white",
            backgroundColor: "warning.main",
            "&:hover": {
              backgroundColor: "warning.main",
            },
          }}
          startIcon={<RiDiscountPercentFill size={20} />}
        >
          Mã giảm giá
        </Button>
        {currentDiscount && (
          <Stack gap={1}>
            <Typography sx={{ fontWeight: 600, color: "secondary.main" }}>
              Mã đang áp dụng
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ color: "primary.main" }}
            >
              <FaRegCheckCircle size={20} />
              <Typography sx={{ color: "text.primary" }}>
                <Typography component="span" sx={{ fontWeight: 500 }}>
                  {currentDiscount?.ma_chietkhau}
                </Typography>{" "}
                <Typography component="span">
                  {currentDiscount?.ten_chietkhau}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default Discounts;
