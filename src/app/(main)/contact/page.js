import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import TextInput from "~/components/ui/input/TextInput";
import AreaInput from "~/components/ui/input/AreaInput";
import LoadingButton from "~/components/ui/button/LoadingButton";

function ContactPage() {
  return (
    <Box sx={{ py: 2, backgroundColor: "background.default" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 2,
                backgroundColor: "background.paper",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h1">Liên Hệ</Typography>
              <Stack gap={0.5} sx={{ mt: 2 }}>
                <Typography sx={{ textTransform: "uppercase" }}>
                  Ten cong ty
                </Typography>
                <Typography>Dia chi: dia chi cong ty</Typography>
                <Typography>Hotline: 09966437458</Typography>
                <Typography>Email: ctythienthuy168@gmail.com</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                p: 2,
                backgroundColor: "background.paper",
                borderRadius: "10px",
              }}
            >
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <TextInput
                    id="name"
                    label="Tên liên hệ"
                    placeholder="Nhập tên liên hệ"
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextInput
                    id="phone"
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại liên hệ"
                    inputProps={{ inputMode: "numeric", pattern: "0-9*" }}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextInput
                    id="email"
                    label="Email liên hệ"
                    placeholder="Nhập email liên hệ"
                  />
                </Grid>
                <Grid xs={12}>
                  <AreaInput
                    label="Nội dung"
                    id="content"
                    placeholder="Nhập nội dung liên hệ"
                  />
                </Grid>
              </Grid>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                gap={1}
                sx={{ mt: 1 }}
              >
                <Button variant="contained" color="secondary">
                  Nhập lại
                </Button>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  sx={{ color: "common.white" }}
                  loading
                >
                  Gửi
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactPage;
