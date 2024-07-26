"use client";
import React, { useEffect } from "react";
import DialogBase from "./DialogBase";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import {
  MdClose,
  MdOutlineDriveFileRenameOutline,
  MdPhoneAndroid,
} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAlert from "~/hooks/useAlert";
import DialogAlert from "./DialogAlert";
import TextInput from "../input/TextInput";
import PasswordInput from "../input/PasswordInput";
import SelectApiInput from "../input/SelectApiInput";
import { signup } from "~/actions/auth.action";
import { CUSTOMER_GROUP, ID_APP } from "~/utils/constants";
import LoadingButton from "../button/LoadingButton";

const schema = yup.object({
  email: yup.string().required("Vui lòng nhập số điện thoại"),
  name: yup.string().required("Vui lòng nhập họ tên"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Mật khẩu phải có từ 6 ký tự, ít nhất 1 số, 1 chữ cái thường và 1 chữ cái in hoa"
    ),
  rePassword: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .equals([yup.ref("password")], "Mật khẩu xác nhận không trùng khớp"),
});

function DialogRegister({ open, onClose }) {
  const defaultData = {
    email: "",
    name: "",
    password: "",
    rePassword: "",
  };
  const {
    showAlert,
    open: openAlert,
    title,
    width,
    message,
    type,
    onClose: onCloseAlert,
  } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: defaultData,
  });

  const generateDataPost = (values) => {
    return {
      ...values,
      id_app: ID_APP,
      group_id: CUSTOMER_GROUP,
      customer_info: {
        dien_thoai: values?.email || "",
        email: "customer@gmail.com",
        ma_so_thue: "45363663",
        introducer: "phuongoanh@gmail.com",
        nh_kh: "666924c7efc8bc2904fe82c3",
      },
    };
  };

  const handleSave = async (values) => {
    const dataPost = generateDataPost(values);
    const resp = await signup({ data: dataPost });
    if (resp.status === 200) {
      showAlert({
        title: "Đăng ký thành công",
        width: "400px",
        type: "success",
        message:
          "Quý khách đã đăng ký thành công, hãy đăng nhập và đặt đơn hàng đầu tiền cho mình nào",
      });
    } else {
      showAlert({
        title: "Đăng ký không thành công",
        width: "400px",
        type: "error",
        message: resp.response.data.error,
      });
    }
  };

  return (
    <>
      <DialogAlert
        title={title}
        open={openAlert}
        message={message}
        onClose={onCloseAlert}
        width={width}
        type={type}
      />
      <DialogBase
        open={open}
        onClose={onClose}
        width="600px"
        renderTitle={() => {
          return (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 3, py: 2 }}
            >
              <Typography
                variant="h2"
                sx={{ flex: 1, textAlign: "center", color: "primary.main" }}
              >
                Đăng Ký Tài Khoản
              </Typography>
              <IconButton onClick={onClose}>
                <MdClose size={25} />
              </IconButton>
            </Stack>
          );
        }}
        content={
          <Box>
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h6">
                  Hình thức kinh doanh của bạn là gì ?
                </Typography>
                <SelectApiInput
                  startAdornment={<FaBuilding size={20} />}
                  placeholder="Chọn một hình thức kinh doanh"
                  apiCode="dmnhkh"
                  searchFileds={["ma_vt", "ten_vt"]}
                  getOptionLabel={(option) => option.ten_vt}
                  isOptionEqualToValue={(op, val) => op.ten_vt === val.ten_vt}
                />
              </Stack>
              <Stack spacing={2}>
                <TextInput
                  placeholder="Nhập số điện thoại*"
                  startAdornment={<MdPhoneAndroid size={25} />}
                  name="email"
                  register={register}
                  errorMessage={errors?.email?.message}
                />
                <TextInput
                  placeholder="Họ tên*"
                  startAdornment={<MdOutlineDriveFileRenameOutline size={25} />}
                  name="name"
                  register={register}
                  errorMessage={errors?.name?.message}
                />
                <PasswordInput
                  placeholder="Nhập mật khẩu*"
                  startAdornment={<RiLockPasswordFill size={25} />}
                  name="password"
                  register={register}
                  errorMessage={errors?.password?.message}
                />
                <PasswordInput
                  placeholder="Nhập lại mật khẩu*"
                  startAdornment={<RiLockPasswordFill size={25} />}
                  name="rePassword"
                  register={register}
                  errorMessage={errors?.rePassword?.message}
                />
                <TextInput
                  placeholder="Mã người giới thiệu"
                  startAdornment={<FaUserAlt size={25} />}
                />
              </Stack>
            </Stack>
          </Box>
        }
        actions={[
          <Stack key={1} direction="row" sx={{ width: "100%", px: 2, py: 1 }}>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              fullWidth
              sx={{ color: "common.white", height: "45px", fontWeight: 600 }}
              onClick={handleSubmit(handleSave)}
            >
              Đăng ký
            </LoadingButton>
          </Stack>,
        ]}
      />
    </>
  );
}

export default DialogRegister;
