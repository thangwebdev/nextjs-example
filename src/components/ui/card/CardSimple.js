import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function CardSimple({
  data = { id: "", title: "", description: "", image: "" },
  wrapperSx = {},
  titleSx = {},
  descriptionSx = {},
}) {
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        ...wrapperSx,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Image
          src={data?.image}
          alt={data?.image}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
        <Stack>
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "primary.main",
              fontWeight: 500,
              ...titleSx,
            }}
          >
            {data?.title}
          </Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: "14px", ...descriptionSx }}
          >
            {data?.description}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CardSimple;
