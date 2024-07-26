"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import ChangeNumber from "~/components/common/product/components/ChangeNumber";
import { BsTrash } from "react-icons/bs";
import Link from "next/link";
import { generateLinkImage, numeralCustom } from "~/utils/helpers";
import { asyncGet } from "~/utils/httpRequest";
import { useAppContext } from "~/contexts/ContextProvider";
import { addOrUpdateItemCart, deleteItemCart } from "~/actions/cart.action";
import { toast } from "react-toastify";
import useConfirm from "~/hooks/useConfirm";

function CartItem({ data }) {
  const { token, showAlert, initCart, setShowBackdrop } = useAppContext();
  const { showConfirm } = useConfirm();
  const [product, setProduct] = useState();

  // const giaBan =
  //   (data.gia_ban_le || 0) * (1 + (data?.exfields?.thue_suat_nk || 0) / 100);

  const getProduct = async () => {
    const resp = await asyncGet({
      apiCode: "dmvt",
      id: data?.exfields?.product_id,
    });
    if (resp.status === 200) {
      setProduct(resp.data);
    } else {
      showAlert({
        title: "Vui lòng thử lại",
        width: "400px",
        type: "error",
        message:
          resp.data.message ||
          resp.data.error ||
          "Lỗi khi tải thông tin sản phẩm",
      });
    }
  };

  const handleDelete = async () => {
    try {
      setShowBackdrop(true);
      const resp = await deleteItemCart({ id: data?._id, token });
      if (resp.status === 200) {
        await initCart();
        toast(`Đã XÓA sản phẩm '${data?.ten_vt}' khỏi giỏ hàng`, {
          type: "error",
        });
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message || resp.data.error || "Lỗi khi cập nhật giỏ hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  const handleSelectChange = async (e) => {
    try {
      setShowBackdrop(true);
      const isSelect = e.target.checked;
      const resp = await addOrUpdateItemCart({
        type: "update",
        token,
        cartItem: { ...data, status: isSelect },
      });
      if (resp.status !== 200) {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message || resp.data.error || "Lỗi khi cập nhật giỏ hàng",
        });
      } else {
        await initCart();
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.ma_vt]);

  return (
    <Box
      sx={{ px: 2, py: 1, borderBottom: "1px dashed", borderColor: "divider" }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Stack direction="row" alignItems="flex-start" gap={2}>
            <Image
              src={
                data?.picture
                  ? generateLinkImage(data?.picture)
                  : "/no_thumbnail.png"
              }
              style={{ objectFit: "contain" }}
              alt="product image"
              width={80}
              height={80}
            />
            <Stack>
              <Typography
                component={Link}
                href={`/products/${data?.exfields?.product_id}/${data?.exfields?.ma_dvt}`}
                sx={{
                  fontWeight: 500,
                  color: "text.primary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {data?.ten_vt}{" "}
                <Chip
                  component="span"
                  variant="filled"
                  label={data?.exfields?.ten_dvt || ""}
                  size="small"
                  color="secondary"
                  sx={{ height: "100%" }}
                />{" "}
                {data?.exfields?.hoa_don && (
                  <Chip
                    component="span"
                    variant="filled"
                    label="Hóa đơn"
                    size="small"
                    color="primary"
                    sx={{
                      height: "100%",
                      "& .MuiChip-label": { color: "common.white" },
                    }}
                  />
                )}
              </Typography>
              {data?.exfields?.quy_cach && (
                <Typography>{data?.exfields?.quy_cach}</Typography>
              )}
              <Typography sx={{ fontWeight: 600, color: "error.main" }}>
                {numeralCustom(data?.gia_ban_nt).format()} đ
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={12} md={6}>
          <Box>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <ChangeNumber
                  disabledMinus={data?.sl_xuat <= 1}
                  product={{
                    ...product,
                    gia_ban_le: data.gia_ban_le,
                    ma_dvt: data?.exfields?.ma_dvt,
                    ten_dvt: data?.exfields?.ten_dvt,
                  }}
                  wrapperSx={{
                    overflow: "hidden",
                    borderRadius: "10px",
                    border: "1px dashed #33333355",
                    height: "42px",
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <Typography
                  sx={{
                    width: "100%",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "primary.main",
                    textAlign: "center",
                  }}
                >
                  {numeralCustom(data?.gia_ban_nt * data?.sl_xuat).format()}đ
                </Typography>
              </Grid>
              <Grid xs={2}>
                <Stack direction="column" alignItems="flex-end" gap={1}>
                  <Checkbox
                    size="medium"
                    checked={data?.status}
                    onChange={handleSelectChange}
                  />
                  <IconButton
                    onClick={() => {
                      showConfirm({
                        title: "Xác nhận",
                        width: "400px",
                        message:
                          "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không ?",
                        onConfirm: handleDelete,
                      });
                    }}
                  >
                    <BsTrash size={20} />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartItem;
