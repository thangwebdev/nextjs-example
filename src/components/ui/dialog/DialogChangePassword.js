"use client";
import React from "react";
import DialogBase from "./DialogBase";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAlert from "~/hooks/useAlert";
import PasswordInput from "../input/PasswordInput";
import { useAppContext } from "~/contexts/ContextProvider";
import { updatePassword } from "~/actions/auth.action";
import LoadingButton from "../button/LoadingButton";
import DialogAlert from "./DialogAlert";

const schema = yup.object({
  oldPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
  reNewPassword: yup
    .string()
    .equals([yup.ref("newPassword")], "Mật khẩu xác nhận không trùng khớp"),
});

function DialogChangePassword({ open, onClose }) {
  const defaultData = { oldPassword: "", newPassword: "", reNewPassword: "" };
  const {
    showAlert,
    open: openAlert,
    title,
    width,
    message,
    type,
    onClose: onCloseAlert,
  } = useAlert();
  const { token } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: defaultData,
  });

  const handleSave = async (values) => {
    const resp = await updatePassword({ token, data: values });
    if (resp.status === 200) {
      showAlert({
        title: "Thông báo",
        width: "400px",
        type: "success",
        message: "Cập nhật thành công",
      });
      reset(defaultData);
      onClose();
    } else {
      showAlert({
        title: "Thông báo",
        width: "400px",
        type: "error",
        message: resp.data.message || resp.data.error || "Có lỗi xảy ra",
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
        width="500px"
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
                Đổi mật khẩu
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
                <PasswordInput
                  id="oldPassword"
                  placeholder="Nhập mật khẩu hiện tại"
                  label="Mật khẩu hiện tại"
                  name="oldPassword"
                  register={register}
                  errorMessage={errors?.oldPassword?.message}
                />
                <PasswordInput
                  id="newPassword"
                  placeholder="Nhập mật khẩu mới"
                  label="Mật khẩu mới"
                  name="newPassword"
                  register={register}
                  errorMessage={errors?.newPassword?.message}
                />
                <PasswordInput
                  id="reNewPassword"
                  placeholder="Nhập lại mật khẩu mới"
                  label="Nhập lại mật khẩu mới"
                  name="reNewPassword"
                  register={register}
                  errorMessage={errors?.reNewPassword?.message}
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
              Cập nhật
            </LoadingButton>
          </Stack>,
        ]}
      />
    </>
  );
}

export default DialogChangePassword;
