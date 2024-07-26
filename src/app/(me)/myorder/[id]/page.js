import React from "react";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Info from "./components/Info";
import Process from "./components/Process";
import RequireExportBill from "./components/RequireExportBill";
import Details from "./components/Details";
import Total from "./components/Total";
import { asyncGet, asyncGetList } from "~/utils/httpRequest";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = { title: "Chi tiết đơn hàng" };

async function OrderInfoPage({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const resp = await asyncGet({
    apiCode: "pbl_pharma",
    id: params.id,
    token: atob(token),
  });

  const respTrangthai = await asyncGetList({
    apiCode: "trangthai",
    withIdApp: false,
    condition: { page: 1, limit: 99999, q: { ma_ct: "pbl_pharma" } },
  });

  if (resp?.status !== 200 || respTrangthai?.status !== 200) {
    redirect("/myorder");
  }

  const order = resp.data;
  const trangthais = respTrangthai.data;

  return (
    <Stack gap={2}>
      <Box>
        <Grid container spacing={1}>
          <Grid xs={12} md={7}>
            <Info order={order} />
          </Grid>
          <Grid xs={12} md={5}>
            <Process order={order} trangthais={trangthais} />
          </Grid>
        </Grid>
      </Box>
      <RequireExportBill />
      <Details details={order?.details || []} />
      <Total order={order} />
    </Stack>
  );
}

export default OrderInfoPage;
