"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import TextInput from "~/components/ui/input/TextInput";
import LoadingButton from "~/components/ui/button/LoadingButton";
import { useAppContext } from "~/contexts/ContextProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateProfile } from "~/actions/auth.action";
import Image from "next/image";
import DialogChangePassword from "~/components/ui/dialog/DialogChangePassword";

const schema = yup.object({
  name: yup.string().required("Tên không được bỏ trống"),
  email2: yup.string().email("Email không đúng định dạng"),
  phone: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7,8}$/,
      {
        message: "Số điện thoại không hợp lệ",
        excludeEmptyString: true,
      }
    ),
});

function AccountPage() {
  const defaultData = {
    email: "",
    email2: "",
    phone: "",
    name: "",
  };
  const { token, profile, showAlert, getPrivateData } = useAppContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: profile
      ? {
          ...defaultData,
          email: profile?.email || "",
          email2: profile?.email2 || "",
          name: profile?.name || "",
          phone: profile?.phone || "",
        }
      : defaultData,
  });
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleUpdate = async (values) => {
    const resp = await updateProfile({ token, data: values });
    if (resp.status === 200) {
      showAlert({
        title: "Thông báo",
        width: "400px",
        type: "success",
        message: "Cập nhật thành công",
      });
      await getPrivateData();
    } else {
      showAlert({
        title: "Thông báo",
        width: "400px",
        type: "error",
        message: resp?.data?.message || resp?.data?.error || "Có lỗi xảy ra",
      });
    }
  };

  useEffect(() => {
    if (profile) {
      setValue("email", profile.email);
      setValue("email2", profile.email2);
      setValue("name", profile.name);
      setValue("phone", profile.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <>
      <DialogChangePassword
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
      <Box
        sx={{
          width: "100%",
          p: 2,
          borderRadius: "10px",
          backgroundColor: "background.paper",
        }}
      >
        <Stack direction="row" alignItems="center" mb={2} gap={1}>
          <Image src="/profile.png" alt="Profile" width={30} height={30} />
          <Typography variant="h5">Thông tin tài khoản</Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <TextInput
              id="email"
              placeholder="Tài khoản"
              label="Tài khoản"
              fullWidth
              readOnly
              required
              name="email"
              register={register}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextInput
              id="name"
              placeholder="Họ và tên"
              label="Họ và tên"
              required
              fullWidth
              name="name"
              register={register}
              errorMessage={errors?.name?.message}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextInput
              id="phone"
              placeholder="Số điện thoại"
              label="Số điện thoại"
              fullWidth
              name="phone"
              register={register}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              errorMessage={errors?.phone?.message}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextInput
              id="email2"
              placeholder="Email khôi phục mật khẩu"
              label="Email khôi phục mật khẩu"
              fullWidth
              name="email2"
              register={register}
              errorMessage={errors?.email2?.message}
            />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ pt: 2 }}
          gap={2}
        >
          <Button
            sx={{ fontWeight: 600 }}
            onClick={() => setOpenChangePassword(true)}
          >
            Đổi mật khẩu
          </Button>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            sx={{ color: "common.white", fontWeight: 600 }}
            onClick={handleSubmit(handleUpdate)}
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
}

export default AccountPage;
