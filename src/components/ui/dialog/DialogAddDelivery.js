"use client";
import React from "react";
import DialogBase from "./DialogBase";
import { Box, Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import TextInput from "../input/TextInput";
import SelectApiInput from "../input/SelectApiInput";
import { Controller, useForm } from "react-hook-form";
import { useAppContext } from "~/contexts/ContextProvider";
import LoadingButton from "../button/LoadingButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { asyncPostData, asyncPutData } from "~/utils/httpRequest";
import { updateCustomer } from "~/actions/customer.action";

const schema = yup.object({
  ten_nguoi_nhan: yup.string().required("Vui lòng nhập tên người nhận"),
  dien_thoai: yup
    .string()
    .matches(/^[0-9]*$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  tinh_thanh: yup
    .object()
    .typeError("Vui lòng chọn tỉnh")
    .required("Vui lòng chọn tỉnh"),
  quan_huyen: yup
    .object()
    .typeError("Vui lòng chọn quận huyện")
    .required("Vui lòng chọn quận huyện"),
  xa_phuong: yup
    .object()
    .typeError("Vui lòng chọn xã phường")
    .required("Vui lòng chọn xã phường"),
  dia_chi: yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
});

function DialogAddDelivery({
  open,
  onClose,
  isEdit,
  defaultValues,
  handleSuccess,
}) {
  const { customer, token, showAlert } = useAppContext();
  const defaultData = {
    ten_nguoi_nhan: "",
    dien_thoai: "",
    tinh_thanh: null,
    quan_huyen: null,
    xa_phuong: null,
    dia_chi: "",
    mac_dinh: false,
  };
  const originData = {
    ...defaultData,
    ...defaultValues,
    ten_nguoi_nhan: defaultValues?.exfields?.ten_nguoi_nhan || "",
    tinh_thanh: defaultValues?.tinh_thanh
      ? {
          ma_tinh_thanh: defaultValues.tinh_thanh,
          ten_tinh_thanh: defaultValues.ten_tinh_thanh,
        }
      : null,
    quan_huyen: defaultValues?.quan_huyen
      ? {
          ma_quan_huyen: defaultValues.quan_huyen,
          ten_quan_huyen: defaultValues.ten_quan_huyen,
        }
      : null,
    xa_phuong: defaultValues?.xa_phuong
      ? {
          ma_xa_phuong: defaultValues.xa_phuong,
          ten_xa_phuong: defaultValues.ten_xa_phuong,
        }
      : null,
    mac_dinh: customer?.exfields?.id_thongtingiaohang === defaultValues?._id,
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: originData,
    resolver: yupResolver(schema),
  });

  const tinhThanh = watch("tinh_thanh");
  const quanHuyen = watch("quan_huyen");

  const generateDataPost = (values) => {
    const { ten_nguoi_nhan, tinh_thanh, quan_huyen, xa_phuong, ...fields } =
      values;
    return {
      ...fields,
      ma_kh: customer?.ma_kh || "",
      ten_kh: customer?.ten_kh || "",
      tinh_thanh: tinh_thanh?.ma_tinh_thanh || "",
      ten_tinh_thanh: tinh_thanh?.ten_tinh_thanh || "",
      quan_huyen: quan_huyen?.ma_quan_huyen || "",
      ten_quan_huyen: quan_huyen?.ten_quan_huyen || "",
      xa_phuong: xa_phuong?.ma_xa_phuong || "",
      ten_xa_phuong: xa_phuong?.ten_xa_phuong || "",
      exfields: {
        ten_nguoi_nhan,
      },
    };
  };

  const handleSave = async (values) => {
    const dataPost = generateDataPost(values);
    let resp = null;
    if (isEdit) {
      resp = await asyncPutData({
        apiCode: "thongtingiaohang",
        id: defaultValues._id,
        token,
        data: dataPost,
      });
    } else {
      resp = await asyncPostData({
        apiCode: "thongtingiaohang",
        token,
        data: dataPost,
      });
    }
    if (resp.status === 200) {
      showAlert({
        title: "Thành công",
        width: "400px",
        type: "success",
        message: `${isEdit ? "Sửa" : "Thêm"} thông tin giao hàng thành công`,
      });
      if (dataPost.mac_dinh) {
        await updateCustomer({
          token,
          id: customer?._id,
          data: {
            exfields: {
              ...(customer?.exfields || {}),
              id_thongtingiaohang: resp.data?._id,
            },
          },
        });
      } else {
        if (customer?.exfields?.id_thongtingiaohang === resp.data?._id) {
          await updateCustomer({
            token,
            id: customer?._id,
            data: {
              exfields: {
                ...(customer?.exfields || {}),
                id_thongtingiaohang: null,
              },
            },
          });
        }
      }
      reset(originData);
      onClose();
      handleSuccess?.();
    } else {
      showAlert({
        title: "Vui lòng thử lại",
        width: "400px",
        type: "error",
        message:
          resp.data.message ||
          resp.data.error ||
          `Lỗi khi ${isEdit ? "sửa" : "thêm"} thông tin giao hàng`,
      });
    }
  };

  if (!open) return null;

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      width="600px"
      zIndex={102}
      title={`${isEdit ? "Sửa" : "Thêm"} thông tin giao hàng`}
      actions={[
        <Stack
          key={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
          sx={{ width: "100%" }}
        >
          <LoadingButton
            loading={isSubmitting}
            onClick={handleSubmit(handleSave)}
            variant="contained"
            sx={{
              height: "42px",
              color: "common.white",
              fontWeight: 600,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            Lưu
          </LoadingButton>
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
        </Stack>,
      ]}
      content={
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Grid container spacing={1}>
            <Grid xs={12} md={6}>
              <TextInput
                fullWidth
                placeholder="Tên người nhận*"
                register={register}
                name="ten_nguoi_nhan"
                errorMessage={errors?.ten_nguoi_nhan?.message}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextInput
                fullWidth
                name="dien_thoai"
                register={register}
                placeholder="Số điện thoại người nhận*"
                errorMessage={errors?.dien_thoai?.message}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="tinh_thanh"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <SelectApiInput
                      placeholder="Tỉnh / thành phố*"
                      apiCode="tinhthanh"
                      searchFileds={["ma_tinh_thanh", "ten_tinh_thanh"]}
                      withIdApp={false}
                      value={value || { ma_tinh_thanh: "", ten_tinh_thanh: "" }}
                      onSelect={(val) => {
                        setValue("quan_huyen", null);
                        setValue("xa_phuong", null);
                        onChange(val);
                      }}
                      getOptionLabel={(option) => option.ten_tinh_thanh}
                      errorMessage={errors?.tinh_thanh?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Controller
                name="quan_huyen"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <SelectApiInput
                      disabled={!tinhThanh}
                      placeholder="Quận / huyện*"
                      apiCode="quanhuyen"
                      withIdApp={false}
                      value={value || { ma_quan_huyen: "", ten_quan_huyen: "" }}
                      onSelect={(val) => {
                        setValue("xa_phuong", null);
                        onChange(val);
                      }}
                      condition={{ ma_tinh_thanh: tinhThanh?.ma_tinh_thanh }}
                      searchFileds={["ma_quan_huyen", "ten_quan_huyen"]}
                      getOptionLabel={(option) => option.ten_quan_huyen}
                      errorMessage={errors?.quan_huyen?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Controller
                name="xa_phuong"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <SelectApiInput
                      disabled={!quanHuyen}
                      value={value || { ma_xa_phuong: "", ten_xa_phuong: "" }}
                      onSelect={onChange}
                      placeholder="Phường / xã*"
                      apiCode="xaphuong"
                      condition={{
                        ma_quan_huyen: quanHuyen?.ma_quan_huyen || "",
                      }}
                      searchFileds={["ma_xa_phuong", "ten_xa_phuong"]}
                      withIdApp={false}
                      getOptionLabel={(option) => option.ten_xa_phuong}
                      errorMessage={errors?.xa_phuong?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid xs={12}>
              <TextInput
                fullWidth
                name="dia_chi"
                register={register}
                placeholder="Số nhà, tên đường, khóm ấp, khu phố"
                errorMessage={errors?.dia_chi?.message}
              />
            </Grid>
          </Grid>
          <Controller
            name="mac_dinh"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <FormControlLabel
                  label="Đặt làm địa chỉ mặc định"
                  control={<Checkbox checked={value} onChange={onChange} />}
                />
              );
            }}
          />
        </Box>
      }
    />
  );
}

export default DialogAddDelivery;
