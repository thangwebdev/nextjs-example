import React from "react";
import {
  Box,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import moment from "moment";

function Process({ order, trangthais = [] }) {
  const activeStep = (trangthais || []).findIndex(
    (item) => +item.ma_trang_thai === +order.trang_thai
  );

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        backgroundColor: "background.paper",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography sx={{ color: "text.secondary" }}>Ngày mua</Typography>
        <Typography sx={{ color: "text.primary" }}>
          {moment(order?.ngay_ct).format("DD-MM-YYYY HH:mm")}
        </Typography>
      </Stack>
      <Stepper activeStep={activeStep} orientation="vertical">
        {trangthais?.length > 0 &&
          trangthais.map((step) => (
            <Step key={step.ma_trang_thai}>
              <StepLabel
                error={
                  order?.trang_thai == 9 &&
                  ![0, 9].includes(+step.ma_trang_thai)
                }
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "16px",
                    color: "text.secondary",
                  },
                }}
              >
                {step.ten_trang_thai}
              </StepLabel>
            </Step>
          ))}
      </Stepper>
    </Box>
  );
}

export default Process;
