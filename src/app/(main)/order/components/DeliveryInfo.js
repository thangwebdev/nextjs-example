import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import EditDelivery from "./EditDelivery";
import Delivery from "~/components/common/delivery/Delivery";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncGet } from "~/utils/httpRequest";

function DeliveryInfo() {
  const { token, customer, showAlert } = useAppContext();
  const [data, setData] = useState();

  const getData = async () => {
    const resp = await asyncGet({
      id: customer?.exfields?.id_thongtingiaohang,
      token,
      apiCode: "thongtingiaohang",
    });
    if (resp.status === 200) {
      setData(resp.data);
    } else {
      showAlert({
        title: "Vui lòng thử lại",
        width: "400px",
        type: "error",
        message:
          resp.data?.message ||
          resp.data?.error ||
          "Lỗi khi cập nhật phương thức thanh toán",
      });
    }
  };

  useEffect(() => {
    if (customer?.exfields?.id_thongtingiaohang) {
      getData();
    } else {
      setData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

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
        <Typography variant="h5">Thông tin giao hàng</Typography>
        <EditDelivery />
      </Stack>
      {!!data ? (
        <Delivery data={data} />
      ) : (
        <Box sx={{ py: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Vui lòng thêm thông tin giao hàng
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default DeliveryInfo;
