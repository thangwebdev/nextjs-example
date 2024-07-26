"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/material";
import ListProduct from "./ListProduct";
import DeliveryInfo from "./DeliveryInfo";
import PaymentMethods from "./PaymentMethods";
import Note from "./Note";
import OrderInfo from "./OrderInfo";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncGet, asyncGetList } from "~/utils/httpRequest";

function Content() {
  const { customer, token, setShowBackdrop, showAlert } = useAppContext();
  const [pbl, setPbl] = useState();
  const [pttts, setPttts] = useState([]);

  const getPbl = async (id) => {
    try {
      setShowBackdrop(true);
      if (!id) return;
      const resp = await asyncGet({ apiCode: "pbl_pharma", token, id });
      if (resp.status === 200) {
        setPbl(resp.data);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message: "Lỗi khi tải thông tin đơn hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };
  const getPttts = async () => {
    try {
      setShowBackdrop(true);
      const resp = await asyncGetList({
        apiCode: "ptthanhtoan",
        token,
        condition: { page: 1, limit: 99999, q: { status: true } },
      });
      if (resp.status === 200) {
        setPttts(resp.data);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message: "Lỗi khi tải phương thức thanh toán",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  useEffect(() => {
    const pblId = customer?.exfields?.id_pbl;
    if (pblId) {
      getPbl(pblId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.exfields?.id_pbl]);
  useEffect(() => {
    getPttts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8.5}>
        <Stack
          gap={2}
          className="hidden-scroll"
          sx={{
            height: "auto",
            maxHeight: { xs: "unset", md: "calc(100vh - 60px - 24px)" },
            overflow: "auto",
          }}
        >
          <ListProduct details={pbl?.details} />
          <DeliveryInfo />
          <PaymentMethods pttts={pttts} pbl={pbl} setPbl={setPbl} />
          <Note pbl={pbl} />
        </Stack>
      </Grid>
      <Grid xs={12} md={3.5}>
        <OrderInfo pbl={pbl} />
      </Grid>
    </Grid>
  );
}

export default Content;
