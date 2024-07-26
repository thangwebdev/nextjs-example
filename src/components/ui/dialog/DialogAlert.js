"use client";
import React, { useMemo } from "react";
import DialogBase from "./DialogBase";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

function DialogAlert({
  title,
  open,
  onClose,
  width = "400px",
  message,
  type = "error",
}) {
  const typeImage = useMemo(() => {
    switch (type) {
      case "error":
        return "/error.png";
      case "warning":
        return "/warning.png";
      case "info":
        return "/info.png";
      default:
        return "/success.png";
    }
  }, [type]);
  return (
    <DialogBase
      title={title}
      open={open}
      onClose={onClose}
      width={width}
      zIndex={9999999}
      content={
        <Stack alignItems="center" spacing={2}>
          <Box sx={{ width: "60px", height: "60px" }}>
            <Image src={typeImage} alt="status image" width={60} height={60} />
          </Box>
          <Typography sx={{ textAlign: "center" }}>{message}</Typography>
        </Stack>
      }
      actions={[
        <Button
          key={1}
          variant="contained"
          onClick={onClose}
          sx={{ color: "common.white" }}
        >
          Đã hiểu
        </Button>,
      ]}
    />
  );
}

export default DialogAlert;
