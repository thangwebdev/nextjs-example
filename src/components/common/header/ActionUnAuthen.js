"use client";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import DialogRegister from "~/components/ui/dialog/DialogRegister";
import DialogLogin from "~/components/ui/dialog/DialogLogin";

function ActionUnAuthen() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>
      <DialogRegister open={openRegister} onClose={handleCloseRegister} />
      <DialogLogin open={openLogin} onClose={handleCloseLogin} />
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          borderRadius: "10px",
        }}
      >
        <Button
          variant="text"
          sx={{
            color: "text.primary",
            width: "92px",
            borderRadius: "10px",
            height: "42px",
            borderRadius: "6px 0px 0px 6px",
            textTransform: "none",
            fontWeight: 600,
            color: "primary.main",
            backgroundColor: "background.paper",
            "&:hover": {
              backgroundColor: "background.paper",
            },
          }}
          onClick={() => setOpenRegister(true)}
        >
          Đăng ký
        </Button>
        <Button
          onClick={() => setOpenLogin(true)}
          variant="text"
          sx={{
            color: "common.white",
            width: "92px",
            height: "42px",
            borderRadius: "0px 6px 6px 0px",
            textTransform: "none",
            fontWeight: 600,
            border: "2px solid",
            borderColor: "common.white",
            borderLeft: "none",
          }}
        >
          Đăng nhập
        </Button>
      </Stack>
    </>
  );
}

export default ActionUnAuthen;
