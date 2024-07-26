import React, { useState } from "react";
import DialogBase from "./DialogBase";
import { Button, Stack } from "@mui/material";
import DialogAddDelivery from "./DialogAddDelivery";
import Deliveries from "~/app/(me)/mydelivery/components/Deliveries";
import { MdAddCircleOutline } from "react-icons/md";

function DialogDeliveries({ open, onClose }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setIsEdit(false);
  };

  return (
    <>
      <DialogAddDelivery
        open={openAdd}
        onClose={handleCloseAdd}
        isEdit={isEdit}
      />
      <DialogBase
        title="Thông tin giao hàng"
        open={open}
        onClose={onClose}
        width="600px"
        zIndex={101}
        actions={[
          <Stack
            key={1}
            alignItems="center"
            gap={1}
            sx={{ width: "100%", px: 1 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              gap={1}
              sx={{ width: "100%" }}
            >
              <Button
                variant="contained"
                onClick={onClose}
                sx={{
                  height: "42px",
                  fontWeight: 600,
                  backgroundColor: "divider",
                  "&:hover": {
                    backgroundColor: "divider",
                  },
                }}
              >
                Đóng
              </Button>
            </Stack>
          </Stack>,
        ]}
        content={
          <Deliveries
            renderTitle={({ handleOpenAdd }) => {
              return (
                <Stack>
                  <Button
                    variant="outlined"
                    startIcon={<MdAddCircleOutline size={16} />}
                    onClick={handleOpenAdd}
                  >
                    Thêm địa chỉ
                  </Button>
                </Stack>
              );
            }}
          />
        }
      />
    </>
  );
}

export default DialogDeliveries;
