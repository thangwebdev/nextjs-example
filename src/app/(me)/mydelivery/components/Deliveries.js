"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { BsTrash } from "react-icons/bs";
import Delivery from "~/components/common/delivery/Delivery";
import DialogAddDelivery from "~/components/ui/dialog/DialogAddDelivery";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncDelete } from "~/utils/httpRequest";
import { updateCustomer } from "~/actions/customer.action";
import useConfirm from "~/hooks/useConfirm";

function Deliveries({ renderTitle }) {
  const {
    customer,
    token,
    showAlert,
    setShowBackdrop,
    initCustomer,
    deliveries,
    initDelivery,
  } = useAppContext();
  const { showConfirm } = useConfirm();
  const [openAdd, setOpenAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [defaultValues, setDefaultValues] = useState();

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setIsEdit(false);
  };
  const handleOpenEdit = (values) => {
    handleOpenAdd();
    setIsEdit(true);
    setDefaultValues(values);
  };

  const handleChangeThongTinGiaoHang = async (newId) => {
    try {
      setShowBackdrop(true);
      const resp = await updateCustomer({
        id: customer?._id,
        token,
        data: {
          exfields: {
            ...(customer?.exfields || {}),
            id_thongtingiaohang: newId,
          },
        },
      });
      if (resp.status === 200) {
        showAlert({
          title: "Thành công",
          width: "400px",
          type: "success",
          message: "Cập nhật địa chỉ giao hàng thành công",
        });
        await initCustomer();
      } else {
        showAlert({
          title: "Có lỗi xảy ra",
          width: "400px",
          type: "error",
          message:
            resp.data?.message ||
            resp.data?.error ||
            "Lỗi khi cập nhật thông tin giao hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  const handleDelete = async (delivery) => {
    const resp = await asyncDelete({
      id: delivery._id,
      token,
      apiCode: "thongtingiaohang",
    });
    if (resp.status === 200) {
      showAlert({
        title: "Thành công",
        width: "400px",
        type: "success",
        message: "Đã xóa thông tin giao hàng thành công",
      });
      if (customer?.exfields?.id_thongtingiaohang === delivery._id) {
        await updateCustomer({
          id: customer?._id,
          token,
          data: {
            exfields: {
              ...(customer?.exfields || {}),
              id_thongtingiaohang: null,
            },
          },
        });
      }
      await initDelivery();
      await initCustomer();
    } else {
      showAlert({
        title: "Vui lòng thử lại",
        width: "400px",
        type: "error",
        message:
          resp.data?.message ||
          resp.data?.error ||
          "Lỗi khi xóa thông tin giao hàng",
      });
    }
  };

  return (
    <>
      {openAdd && (
        <DialogAddDelivery
          isEdit={isEdit}
          handleSuccess={async () => {
            await initDelivery();
            await initCustomer();
          }}
          onClose={handleCloseAdd}
          open={openAdd}
          defaultValues={isEdit ? defaultValues : {}}
        />
      )}
      <Box>
        {renderTitle ? (
          renderTitle({ handleOpenAdd })
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="h5">Thông tin giao hàng</Typography>
            <Button
              variant="contained"
              sx={{ color: "common.white" }}
              onClick={handleOpenAdd}
            >
              Thêm
            </Button>
          </Stack>
        )}
        {deliveries?.length <= 0 ? (
          <Box sx={{ py: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Bạn chưa cung cấp thông tin giao hàng
            </Typography>
          </Box>
        ) : (
          <List
            sx={{
              width: "100%",
              height: "auto",
            }}
          >
            <FormControl sx={{ width: "100%" }}>
              <RadioGroup
                sx={{ gap: 1 }}
                defaultValue={customer?.exfields?.id_thongtingiaohang || ""}
                value={customer?.exfields?.id_thongtingiaohang || ""}
                onChange={(_, val) => {
                  handleChangeThongTinGiaoHang(val);
                }}
              >
                {deliveries?.length > 0 &&
                  deliveries.map((delivery, index) => {
                    const active =
                      customer?.exfields?.id_thongtingiaohang === delivery._id;
                    return (
                      <Stack
                        key={delivery._id}
                        sx={{
                          p: 2,
                          pt: 1,
                          borderRadius: "10px",
                          border: "1px dashed",
                          borderColor: "divider",
                          backgroundColor: active ? "primary.100" : "",
                        }}
                        gap={1}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ width: "100%" }}
                        >
                          <FormControlLabel
                            label={`Thông tin giao hàng ${index + 1}`}
                            control={
                              <Radio value={delivery._id} checked={active} />
                            }
                            sx={{
                              "& .MuiTypography-root": { fontWeight: 600 },
                            }}
                          />
                          <Stack direction="row" alignItems="center">
                            <Button
                              sx={{
                                height: "42px",
                                color: "secondary.main",
                                fontWeight: 600,
                              }}
                              onClick={() => handleOpenEdit(delivery)}
                            >
                              Sửa
                            </Button>
                            <IconButton
                              sx={{ color: "error.main" }}
                              onClick={() =>
                                showConfirm({
                                  title: "Xác nhận",
                                  width: "400px",
                                  message:
                                    "Bạn có chắc muốn xóa thông tin này không ?",
                                  onConfirm: () => handleDelete(delivery),
                                })
                              }
                            >
                              <BsTrash size={16} />
                            </IconButton>
                          </Stack>
                        </Stack>
                        <Delivery gap={0.5} data={delivery} />
                      </Stack>
                    );
                  })}
              </RadioGroup>
            </FormControl>
          </List>
        )}
      </Box>
    </>
  );
}

export default Deliveries;
