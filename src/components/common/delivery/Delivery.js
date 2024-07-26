import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";

function Delivery({ gap = 2, data }) {
  return (
    <Stack gap={gap}>
      <Stack direction="row" gap={2}>
        <Box sx={{ color: "secondary.main" }}>
          <FaUserAlt size={16} />
        </Box>
        <Typography>{data?.exfields?.ten_nguoi_nhan}</Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <Box sx={{ color: "secondary.main" }}>
          <FaPhoneAlt size={16} />
        </Box>
        <Typography>{data?.dien_thoai}</Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <Box sx={{ color: "secondary.main" }}>
          <FaLocationArrow size={16} />
        </Box>
        <Typography>
          {`${data?.dia_chi || ""}, ${data?.ten_xa_phuong || ""}, ${
            data?.ten_quan_huyen || ""
          }, ${data?.ten_tinh_thanh || ""}`}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Delivery;
