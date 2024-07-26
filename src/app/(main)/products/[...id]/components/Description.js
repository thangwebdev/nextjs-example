import { Box, Typography } from "@mui/material";
import React from "react";

function Description({ data }) {
  return (
    <Box
      sx={{
        border: "1px dashed #33333322",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        mb={1}
        sx={{ px: 2, py: 1, backgroundColor: "background.default" }}
      >
        Thông tin sản phẩm
      </Typography>
      <Box
        sx={{ px: 2, py: 1 }}
        dangerouslySetInnerHTML={{ __html: data || "" }}
      ></Box>
    </Box>
  );
}

export default Description;
