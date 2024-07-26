"use client";
import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import TotalLine from "~/components/common/total-line/TotalLine";
import { numeralCustom } from "~/utils/helpers";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncPutData } from "~/utils/httpRequest";
import { useRouter } from "next/navigation";
import useConfirm from "~/hooks/useConfirm";

function Total({ order }) {
  const { token, setShowBackdrop, showAlert } = useAppContext();
  const { showConfirm } = useConfirm();
  const router = useRouter();

  const handleCancel = async () => {
    try {
      setShowBackdrop(true);
      const resp = await asyncPutData({
        apiCode: "pbl_pharma",
        id: order._id,
        token,
        data: { trang_thai: 9 },
      });
      if (resp.status === 200) {
        showAlert({
          title: "Thành công",
          width: "400px",
          type: "success",
          message: `Đơn hàng #${order.so_ct} đã được hủy`,
        });
        router.push("/myorder?status=9");
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message || resp.data.error || "Lỗi khi hủy đơn hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  return (
    <Stack
      gap={3}
      sx={{ backgroundColor: "background.paper", borderRadius: "10px", p: 2 }}
    >
      <Typography variant="h5">Thông tin đơn hàng</Typography>
      <Stack gap={2}>
        <TotalLine
          label="Tổng tiền hàng"
          labelSx={{ color: "text.primary", fontWeight: 600 }}
          text={`${numeralCustom(order?.t_tien_nt || 0).format()} đ`}
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
          text={`${numeralCustom(order?.t_ck_nt || 0).format()} đ`}
        />
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <TotalLine
        label="Thành tiền"
        labelSx={{ color: "text.primary", fontWeight: 600 }}
        text={`${numeralCustom(order?.t_tt_nt || 0).format()} đ`}
        textSx={{ color: "error.main", fontSize: "20px", fontWeight: 600 }}
      />
      <Stack>
        <Typography>
          Lưu ý: Bạn chỉ có thể hủy đơn ở trạng thái{" "}
          <Typography
            component="span"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            chờ xác nhận
          </Typography>
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={2}
      >
        {order?.trang_thai != 9 && (
          <Button
            variant="contained"
            disabled={Number(order?.trang_thai || 0) !== 0}
            onClick={() => {
              showConfirm({
                title: "Hủy đơn",
                width: "500px",
                message: "Bạn có chắc muốn hủy đơn hàng này không ?",
                onConfirm: handleCancel,
              });
            }}
            sx={{
              width: { xs: "50%", sm: "auto" },
              color: "common.white",
              fontWeight: 600,
              backgroundColor: "error.main",
              "&:hover": {
                backgroundColor: "error.main",
              },
            }}
          >
            Hủy đơn
          </Button>
        )}
        {/* <Button
          variant="contained"
          onClick={handleReOrder}
          sx={{
            width: { xs: "50%", sm: "auto" },
            color: "common.white",
            fontWeight: 600,
            backgroundColor: "secondary.main",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          Đặt lại
        </Button> */}
      </Stack>
    </Stack>
  );
}

export default Total;
