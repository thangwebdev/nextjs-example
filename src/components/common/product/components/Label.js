import React from "react";
import { Chip } from "@mui/material";

function Label({ label, color, sx = {}, labelSx = {} }) {
  return (
    <Chip
      label={label}
      size="small"
      color={color}
      sx={{
        borderRadius: "0px",
        height: "20px",
        "& .MuiChip-label": {
          px: 0.5,
          fontSize: "12px",
          color: "common.white",
          fontWeight: 500,
          ...labelSx,
        },
        ...sx,
      }}
    />
  );
}

export default Label;
