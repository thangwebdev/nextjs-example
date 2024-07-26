"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import { useAppContext } from "~/contexts/ContextProvider";
import { addOrUpdateItemCart, deleteItemCart } from "~/actions/cart.action";
import { toast } from "react-toastify";

function ChangeNumber({
  product,
  wrapperSx = {},
  sxPlus = {},
  sxMinus = {},
  disabledMinus,
}) {
  const {
    token,
    cart,
    profile,
    customer,
    showAlert,
    initCart,
    setShowBackdrop,
  } = useAppContext();
  const [number, setNumber] = useState(0);

  const currentItem = useMemo(() => {
    return (cart || []).find(
      (item) =>
        item.ma_vt === product?.ma_vt &&
        item.exfields?.ma_dvt === product.ma_dvt
    );
  }, [cart, product]);

  const requireLogin = () => {
    showAlert({
      title: "Yêu cầu đăng nhập",
      width: "400px",
      type: "info",
      message:
        "Hệ thống yêu cầu thông tin đăng nhập để lưu thông tin giỏ hàng của bạn.",
    });
  };

  // plus
  const handlePlus = async () => {
    try {
      if (!token) {
        requireLogin();
        return;
      }
      setShowBackdrop(true);
      const existed = (cart || []).find(
        (item) =>
          item.ma_vt === product.ma_vt &&
          item.exfields?.ma_dvt === product.ma_dvt
      );
      if (existed) {
        const resp = await addOrUpdateItemCart({
          cartItem: { ...existed, sl_xuat: (existed.sl_xuat += 1) },
          type: "update",
          token,
        });
        if (resp.status === 200) {
          await initCart();
          toast(
            `Sản phẩm '${product.ten_vt}' đã được TĂNG số lượng trong giỏ hàng`,
            { type: "success" }
          );
        } else {
          showAlert({
            title: "Vui lòng thử lại",
            width: "400px",
            type: "error",
            message:
              resp.data.message ||
              resp.data.error ||
              "Lỗi khi cập nhật giỏ hàng",
          });
        }
      } else {
        const newCartItem = {
          ma_vt: product.ma_vt,
          ten_vt: product.ten_vt,
          picture: product?.picture_thumb,
          gia_ban_le: product.gia_ban_le,
          gia_ban_nt:
            (product.gia_ban_le || 0) * (1 + (product.thue_suat_nk || 0) / 100),
          sl_xuat: 1,
          ma_kh: customer?.ma_kh || "",
          user: profile?.email || "",
          status: false,
          exfields: {
            product_id: product?._id,
            ma_dvt: product?.ma_dvt,
            ten_dvt: product?.ten_dvt,
            quy_cach: product?.quy_cach,
            thue_suat_nk: product?.thue_suat_nk,
            ty_le_ck0: product?.ty_le_ck0,
            hoa_don: product?.exfields?.hoa_don,
          },
        };
        const resp = await addOrUpdateItemCart({
          cartItem: newCartItem,
          token,
          type: "add",
        });
        if (resp.status === 200) {
          await initCart();
          toast(`Sản phẩm '${product.ten_vt}' đã được THÊM vào giỏ hàng`, {
            type: "success",
          });
        } else {
          showAlert({
            title: "Vui lòng thử lại",
            width: "400px",
            type: "error",
            message:
              resp.data.message ||
              resp.data.error ||
              "Lỗi khi cập nhật giỏ hàng",
          });
        }
      }
    } finally {
      setShowBackdrop(false);
    }
  };
  // minus
  const handleMinus = async () => {
    try {
      if (!token) {
        requireLogin();
        return;
      }
      setShowBackdrop(true);
      const existed = (cart || []).find(
        (item) =>
          item.ma_vt === product.ma_vt &&
          item.exfields?.ma_dvt === product.ma_dvt
      );
      if (!existed) return;

      if ((existed.sl_xuat || 0) <= 1) {
        const resp = await deleteItemCart({ id: existed._id, token });
        if (resp.status === 200) {
          await initCart();
          toast(`Đã XÓA sản phẩm '${product?.ten_vt}' khỏi giỏ hàng`, {
            type: "error",
          });
        } else {
          showAlert({
            title: "Vui lòng thử lại",
            width: "400px",
            type: "error",
            message:
              resp.data.message ||
              resp.data.error ||
              "Lỗi khi cập nhật giỏ hàng",
          });
        }
      } else {
        const resp = await addOrUpdateItemCart({
          cartItem: { ...existed, sl_xuat: (existed.sl_xuat -= 1) },
          type: "update",
          token,
        });
        if (resp.status === 200) {
          await initCart();
          toast(
            `Sản phẩm '${product.ten_vt}' đã GIẢM số lượng trong giỏ hàng`,
            {
              type: "info",
            }
          );
        } else {
          showAlert({
            title: "Vui lòng thử lại",
            width: "400px",
            type: "error",
            message:
              resp.data.message ||
              resp.data.error ||
              "Lỗi khi cập nhật giỏ hàng",
          });
        }
      }
    } finally {
      setShowBackdrop(false);
    }
  };
  // change number
  const handleChangeNumber = async () => {
    try {
      if (!token) {
        requireLogin();
        return;
      }
      if (number === currentItem?.sl_xuat) return;
      setShowBackdrop(true);
      const existed = (cart || []).find(
        (item) =>
          item.ma_vt === product.ma_vt &&
          item.exfields?.ma_dvt === product.ma_dvt
      );

      if (existed) {
        if (number <= 0) {
          const resp = await deleteItemCart({ id: existed._id, token });
          if (resp.status === 200) {
            await initCart();
            toast(`Đã XÓA sản phẩm '${product?.ten_vt}' khỏi giỏ hàng`, {
              type: "error",
            });
          } else {
            showAlert({
              title: "Vui lòng thử lại",
              width: "400px",
              type: "error",
              message:
                resp.data.message ||
                resp.data.error ||
                "Lỗi khi cập nhật giỏ hàng",
            });
          }
        } else {
          const resp = await addOrUpdateItemCart({
            type: "update",
            token,
            cartItem: { ...existed, sl_xuat: number },
          });
          if (resp.status === 200) {
            await initCart();
            toast(
              `Đã cập nhật số lượng sản phẩm '${product?.ten_vt}' trong giỏ hàng`,
              {
                type: "success",
              }
            );
          } else {
            showAlert({
              title: "Vui lòng thử lại",
              width: "400px",
              type: "error",
              message:
                resp.data.message ||
                resp.data.error ||
                "Lỗi khi cập nhật giỏ hàng",
            });
          }
        }
      } else {
        if (number <= 0) return;
        const newCartItem = {
          ma_vt: product.ma_vt,
          ten_vt: product.ten_vt,
          picture: product?.picture_thumb,
          gia_ban_le: product.gia_ban_le,
          gia_ban_nt:
            (product.gia_ban_le || 0) * (1 + (product.thue_suat_nk || 0) / 100),
          sl_xuat: 1,
          ma_kh: customer?.ma_kh || "",
          user: profile?.email || "",
          status: false,
          exfields: {
            product_id: product?._id,
            ma_dvt: product?.ma_dvt,
            ten_dvt: product?.ten_dvt,
            quy_cach: product?.quy_cach,
            thue_suat_nk: product?.thue_suat_nk,
            ty_le_ck0: product?.ty_le_ck0,
            hoa_don: product?.exfields?.hoa_don,
          },
        };
        const resp = await addOrUpdateItemCart({
          cartItem: newCartItem,
          token,
          type: "add",
        });
        if (resp.status === 200) {
          await initCart();
          toast(`Sản phẩm '${product.ten_vt}' đã được THÊM vào giỏ hàng`, {
            type: "success",
          });
        } else {
          showAlert({
            title: "Vui lòng thử lại",
            width: "400px",
            type: "error",
            message:
              resp.data.message ||
              resp.data.error ||
              "Lỗi khi cập nhật giỏ hàng",
          });
        }
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  useEffect(() => {
    setNumber(currentItem?.sl_xuat || 0);
  }, [currentItem]);

  if (!product) {
    return <div>Change number</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "42px",
        borderTop: "1px solid",
        borderTopColor: "divider",
        marginTop: "4px",
        ...wrapperSx,
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={3}
          sx={{ borderRight: "1px solid", borderRightColor: "divider" }}
        >
          <Box sx={{ width: "100%", height: "100%" }}>
            <IconButton
              onClick={handleMinus}
              disabled={disabledMinus || (currentItem?.sl_xuat || 0) === 0}
              sx={{
                width: "100%",
                height: "100%",
                padding: 0,
                borderRadius: 0,
                color: "error.main",
                ...sxMinus,
              }}
            >
              <LuMinus size={16} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={number}
            onChange={(e) => {
              let val = Number(e.target.value) || 0;
              if (isNaN(val)) {
                val = 0;
              }
              setNumber(val);
            }}
            onKeyUp={(e) => {
              if (e.which === 13) {
                handleChangeNumber();
              }
            }}
            onBlur={handleChangeNumber}
            inputProps={{ inputMode: "numeric", pattern: "0-9*" }}
            InputProps={{
              autoComplete: "off",
              startAdornment: <LuShoppingCart size={16} />,
            }}
            sx={{
              height: "100%",
              "& .MuiInputBase-root": {
                height: "100%",
                "& .MuiInputBase-input": {
                  p: 0.5,
                  height: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                },
                "& fieldset": {
                  border: "none",
                  outline: "none",
                },
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={3}
          sx={{ borderLeft: "1px solid", borderLeftColor: "divider" }}
        >
          <Box sx={{ width: "100%", height: "100%" }}>
            <IconButton
              onClick={handlePlus}
              sx={{
                width: "100%",
                height: "100%",
                padding: 0,
                borderRadius: 0,
                color: "primary.main",
                ...sxPlus,
              }}
            >
              <LuPlus size={16} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChangeNumber;
