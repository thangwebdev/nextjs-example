"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import DialogDeliveries from "~/components/ui/dialog/DialogDeliveries";

function EditDelivery() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <DialogDeliveries open={open} onClose={handleClose} />
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          height: "42px",
          fontWeight: 600,
          color: "common.white",
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        }}
        endIcon={<MdModeEdit size={18} />}
      >
        Sửa
      </Button>
    </>
  );
}

export default EditDelivery;
