"use client";
import React from "react";
import DialogBase from "./DialogBase";
import { Button, Stack, Typography } from "@mui/material";

function DialogConfirm({
  title,
  open,
  onClose,
  onConfirm,
  width = "400px",
  message,
}) {
  return (
    <DialogBase
      title={title}
      open={open}
      onClose={onClose}
      width={width}
      zIndex={9999999}
      content={
        <Stack alignItems="center" spacing={2}>
          <Typography sx={{ textAlign: "center" }}>{message}</Typography>
        </Stack>
      }
      actions={[
        <Button
          key={1}
          variant="contained"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          sx={{ color: "common.white" }}
        >
          Xác nhận
        </Button>,
        <Button
          key={2}
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "background.default",
            "&:hover": { backgroundColor: "background.default" },
          }}
        >
          Đóng
        </Button>,
      ]}
    />
  );
}

export default DialogConfirm;
