import React from "react";
import { Stack, Typography } from "@mui/material";

function TotalLine({ label, labelSx = {}, text, textSx = {} }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography sx={{ color: "text.secondary", fontWeight: 500, ...labelSx }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 500, ...textSx }}>{text}</Typography>
    </Stack>
  );
}

export default TotalLine;
