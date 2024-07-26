"use client";
import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import TotalLine from "~/components/common/total-line/TotalLine";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncGet, asyncPostData } from "~/utils/httpRequest";
import { useRouter } from "next/navigation";
import { numeralCustom } from "~/utils/helpers";
import { cloneDeep } from "lodash";
import { deleteItemCart } from "~/actions/cart.action";

function OrderInfo({ pbl }) {
  const { customer, token, showAlert, setShowBackdrop, initCart } =
    useAppContext();
  const router = useRouter();

  const handleOrder = async () => {
    try {
      setShowBackdrop(true);
      const pblClone = cloneDeep(pbl);
      pblClone.status = true;
      delete pblClone.so_ct;
      delete pblClone._id;
      delete pblClone.ngay_ct;
      // add delivery
      const respDelivery = await asyncGet({
        apiCode: "thongtingiaohang",
        id: customer?.exfields?.id_thongtingiaohang || "undefined",
        token,
      });
      if (respDelivery.status !== 200) {
        showAlert({
          title: "Chưa có thông tin giao hàng",
          width: "400px",
          type: "warning",
          message: "Bạn vui lòng cung cấp thông tin giao hàng",
        });
        return;
      }
      pblClone.exfields = {
        ...(pblClone?.exfields || {}),
        thon_tin_giao_hang: respDelivery?.data,
      };
      // add pttt
      if (!pblClone.pt_thanh_toan) {
        showAlert({
          title: "Chọn phương thức thanh toán",
          width: "400px",
          type: "warning",
          message: "Bạn chưa chọn phương thức thanh toán",
        });
        return;
      }
      const respCreate = await asyncPostData({
        apiCode: "pbl_pharma",
        token,
        data: pblClone,
      });
      if (respCreate.status === 200) {
        // delete item from cart
        for (let i = 0; i < pblClone.details.length; i++) {
          const item = pblClone.details[i];
          await deleteItemCart({ token, id: item.ma_dt });
        }
        // init cart
        // delete dmchietkhau in customer
        await initCart();
        router.push("/myorder");
        showAlert({
          title: "Đặt hàng thành công",
          width: "400px",
          type: "success",
          message: "Cảm ơn quý khách đã lựa chọn chúng tôi chúng tôi.",
        });
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message || resp.data.error || "Lỗi khi hoàn tất đơn hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{ p: 2, backgroundColor: "background.paper", borderRadius: "10px" }}
    >
      <Typography variant="h5">Thông tin đơn hàng</Typography>
      <Stack gap={2}>
        <TotalLine
          label="Tổng sản phẩm"
          labelSx={{ color: "text.primary", fontWeight: 600 }}
          text={`${pbl?.details?.length || 0} sản phẩm`}
        />
        <TotalLine
          label="Tổng số lượng"
          labelSx={{ color: "text.primary", fontWeight: 600 }}
          text={pbl?.t_sl || 0}
        />
        <TotalLine
          label="Tổng tiền hàng"
          labelSx={{ color: "text.primary", fontWeight: 600 }}
          text={`${numeralCustom(pbl?.t_tien_nt || 0).format()} đ`}
          textSx={{ color: "primary.main", fontWeight: 600 }}
        />
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Stack gap={2}>
        {/* <TotalLine
          label="Phí vận chuyển"
          labelSx={{ color: "text.primary", fontWeight: 600 }}
          text="0"
        /> */}
        <TotalLine
          label="Giảm giá"
          labelSx={{ color: "text.primary", fontWeight: 600 }}
          text={`${numeralCustom(pbl?.t_ck_nt || 0).format()} đ`}
        />
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <TotalLine
        label="Thành tiền"
        labelSx={{ color: "text.primary", fontWeight: 600 }}
        text={`${numeralCustom(pbl?.t_tt_nt || 0).format()} đ`}
        textSx={{ color: "error.main", fontSize: "20px", fontWeight: 600 }}
      />
      <Button
        variant="contained"
        disabled={(pbl?.t_tt_nt || 0) <= 0}
        onClick={handleOrder}
        sx={{ color: "common.white", fontSize: 18, fontWeight: 600 }}
      >
        Hoàn tất
      </Button>
    </Stack>
  );
}

export default OrderInfo;
