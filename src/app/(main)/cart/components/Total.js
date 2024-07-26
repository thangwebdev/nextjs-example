"use client";
import React, { useMemo } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import TotalLine from "../../../../components/common/total-line/TotalLine";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import Discounts from "./Discounts";
import { useAppContext } from "~/contexts/ContextProvider";
import { generateRandomString, numeralCustom } from "~/utils/helpers";
import { asyncGet, asyncPostData, asyncPutData } from "~/utils/httpRequest";
import { useRouter } from "next/navigation";
import { updateCustomer } from "~/actions/customer.action";

function Total() {
  const { token, cart, customer, setShowBackdrop, showAlert, initCustomer } =
    useAppContext();
  const router = useRouter();

  const handleOrder = async () => {
    try {
      setShowBackdrop(true);
      const idPbl = customer?.exfields?.id_pbl;
      let existedPbl;
      if (idPbl) {
        const existedPblResp = await asyncGet({
          apiCode: "pbl_pharma",
          id: idPbl,
          token,
        });
        if (existedPblResp.status === 200) {
          existedPbl = existedPblResp.data;
        }
      }
      const selectedItems = (cart || []).filter((item) => item.status);
      const dataPbl = {
        so_ct: existedPbl ? existedPbl.so_ct : generateRandomString(8),
        trang_thai: 0,
        ma_kh: customer?.ma_kh || "",
        ten_kh: customer?.ten_kh || "",
        details: [],
        exfields: {
          dmckhd: customer?.exfields?.dmchietkhau
            ? [customer?.exfields?.dmchietkhau]
            : [],
        },
        tien_ck_hd: tienChietKhau,
        pt_thanh_toan: "",
        status: false,
      };
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        dataPbl.details.push({
          ma_vt: item.ma_vt,
          ten_vt: item.ten_vt,
          ma_dt: item._id,
          ma_dvt: item.exfields?.ma_dvt,
          ten_dvt: item.exfields?.ten_dvt,
          gia_ban_nt: item.gia_ban_le,
          gia_ban_le_goc: item.gia_ban_le,
          picture: item.picture,
          sl_xuat: item.sl_xuat,
          tien_nt: (item.gia_ban_le || 0) * (item.sl_xuat || 0),
          tien_ck: 0,
          tien_ck_nt: 0,
          tien_hang_nt: (item.gia_ban_le || 0) * (item.sl_xuat || 0),
          tien_xuat_nt: (item.gia_ban_le || 0) * (item.sl_xuat || 0),
          thue_suat: 10,
        });
      }
      let resp;
      if (existedPbl) {
        dataPbl.dien_giai = "";
        resp = await asyncPutData({
          apiCode: "pbl_pharma",
          token,
          id: existedPbl._id,
          data: dataPbl,
        });
      } else {
        resp = await asyncPostData({
          apiCode: "pbl_pharma",
          token,
          data: dataPbl,
        });
      }
      if (resp.status === 200) {
        await updateCustomer({
          token,
          id: customer._id,
          data: { exfields: { ...customer.exfields, id_pbl: resp.data._id } },
        });
        await initCustomer();
        router.push("/order");
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message ||
            resp.data.error ||
            "Lỗi khi lưu thông tin đơn hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  const activedItemCarts = useMemo(() => {
    return (cart || []).filter((item) => item.status);
  }, [cart]);

  const tienHang = useMemo(() => {
    const result = (activedItemCarts || []).reduce((acc, item) => {
      return acc + item.sl_xuat * item.gia_ban_le;
    }, 0);
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activedItemCarts]);

  const tienChietKhau = useMemo(() => {
    const currentCk = customer?.exfields?.dmchietkhau;
    if (currentCk) {
      if (currentCk.ty_le_ck > 0) {
        let tien = ((tienHang || 0) * currentCk.ty_le_ck) / 100;
        if (currentCk.tien_ck > 0 && tien > currentCk.tien_ck) {
          tien = currentCk.tien_ck;
        }
        return tien;
      } else {
        return currentCk.tien_ck || 0;
      }
    } else {
      return 0;
    }
  }, [customer, tienHang]);

  return (
    <Box sx={{ pt: { xs: 0, md: 4 } }}>
      <Stack
        sx={{ backgroundColor: "background.paper", borderRadius: "10px", p: 2 }}
        gap={3}
      >
        <Typography variant="h5">Tổng cộng</Typography>
        <Stack gap={2}>
          <TotalLine
            label="Số lượng"
            text={`${activedItemCarts?.length || 0} sản phẩm`}
          />
          <TotalLine
            label="Tạm tính"
            text={`${numeralCustom(tienHang).format()} đ`}
          />
        </Stack>
        <Divider sx={{ borderStyle: "dashed" }} />
        <Discounts tienHang={tienHang} />
        <Divider sx={{ borderStyle: "dashed" }} />
        <Stack gap={2}>
          <TotalLine
            label="Tổng giảm giá"
            text={`${numeralCustom(tienChietKhau).format()} đ`}
          />
        </Stack>
        <Divider sx={{ borderStyle: "dashed" }} />
        <TotalLine
          label="Tổng tiền"
          labelSx={{ fontWeight: 600, color: "text.primary" }}
          textSx={{ color: "error.main", fontWeight: 600 }}
          text={`${numeralCustom(tienHang - tienChietKhau).format()} đ`}
        />
        <Stack gap={1}>
          <Button
            disabled={!activedItemCarts || activedItemCarts.length <= 0}
            variant="contained"
            onClick={handleOrder}
            sx={{ color: "common.white", fontSize: 18, fontWeight: 600 }}
          >
            Đặt hàng
          </Button>
          <Button
            LinkComponent={Link}
            href="/products"
            endIcon={<FaAngleRight size={16} />}
            sx={{
              height: "20px",
              color: "secondary.main",
              textTransform: "none",
              width: "fit-content",
              alignSelf: "center",
              fontSize: "16px",
            }}
          >
            Xem thêm sản phẩm
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Total;
