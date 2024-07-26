"use client";
import React from "react";
import {
  Box,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncPutData } from "~/utils/httpRequest";

function PaymentMethods({ pttts = [], pbl, setPbl }) {
  const { token, showAlert, setShowBackdrop } = useAppContext();

  const handleChange = async (_, val) => {
    try {
      setShowBackdrop(true);
      const resp = await asyncPutData({
        apiCode: "pbl_pharma",
        id: pbl._id,
        token,
        data: { pt_thanh_toan: val },
      });
      if (resp.status === 200) {
        setPbl(resp.data);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message: "Lỗi khi cập nhật phương thức thanh toán",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Phương thức thanh toán</Typography>
      <FormControl>
        <RadioGroup value={pbl?.pt_thanh_toan || ""} onChange={handleChange}>
          <Grid container spacing={2}>
            {pttts?.length > 0 &&
              pttts.map((pttt) => {
                return (
                  <Grid key={pttt._id} xs={12} md={6}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={2}
                      sx={{
                        borderRadius: "10px",
                        border: "1px dashed",
                        borderColor: "divider",
                        p: 1,
                        height: "100%",
                      }}
                    >
                      <Radio value={pttt._id} />
                      <Stack>
                        <Typography sx={{ fontWeight: 600 }}>
                          {pttt.ten}
                        </Typography>
                        {/* <Typography sx={{ fontWeight: 400 }}>
                          Giảm 1% cho đơn hàng chuyển khoản trước
                        </Typography> */}
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default PaymentMethods;
