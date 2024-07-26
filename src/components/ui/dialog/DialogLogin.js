"use client";
import React, { useEffect } from "react";
import DialogBase from "./DialogBase";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { MdClose, MdPhoneAndroid } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAlert from "~/hooks/useAlert";
import DialogAlert from "./DialogAlert";
import TextInput from "../input/TextInput";
import PasswordInput from "../input/PasswordInput";
import { useAppContext } from "~/contexts/ContextProvider";
import { loginUser } from "~/actions/auth.action";
import LoadingButton from "../button/LoadingButton";

const schema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]*$/, "Số điện thoại không hợp lệ"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Mật khẩu phải có từ 6 ký tự, ít nhất 1 số, 1 chữ cái thường và 1 chữ cái in hoa"
    ),
});

function DialogLogin({ open, onClose }) {
  const { email, password } = useAppContext();
  const defaultData = { email: email || "", password: password || "" };
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
    // resolver: yupResolver(schema),
    defaultValues: defaultData,
  });

  const handleSave = async (values) => {
    const resp = await loginUser({
      username: values.email,
      password: values.password,
    });
    if (resp.status === 200) {
      window.location.reload();
      onClose();
    } else {
      showAlert({
        title: "Thông báo",
        width: "400px",
        type: "error",
        message: resp.response.data.message,
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
                Đăng nhập
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
              <Stack spacing={2}>
                <TextInput
                  placeholder="Nhập số điện thoại*"
                  startAdornment={<MdPhoneAndroid size={25} />}
                  name="email"
                  register={register}
                  errorMessage={errors?.email?.message}
                />

                <PasswordInput
                  placeholder="Nhập mật khẩu*"
                  startAdornment={<RiLockPasswordFill size={25} />}
                  name="password"
                  register={register}
                  errorMessage={errors?.password?.message}
                />
              </Stack>
            </Stack>
          </Box>
        }
        actions={[
          <Stack key={1} direction="row" sx={{ width: "100%", px: 2, py: 1 }}>
            <LoadingButton
              loading={isSubmitting}
              fullWidth
              variant="contained"
              sx={{ color: "common.white", height: "45px", fontWeight: 600 }}
              onClick={handleSubmit(handleSave)}
            >
              Đăng nhập
            </LoadingButton>
          </Stack>,
        ]}
      />
    </>
  );
}

export default DialogLogin;
