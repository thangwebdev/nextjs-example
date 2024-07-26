import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";

function Contact() {
  return (
    <Stack
      spacing={1}
      alignItems="center"
      sx={{
        px: 1,
        py: 2,
        backgroundColor: "background.paper",
        borderRadius: "10px",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "14px", fontWeight: 600 }}
      >
        CHÚNG TÔI LUÔN SẴN SÀNG ĐỂ GIÚP ĐỠ BẠN
      </Typography>
      <Image
        src="/helper.webp"
        alt="helper iamge"
        width={200}
        height={200}
        priority
        quality={100}
        style={{ maxWidth: "100%" }}
      />
      <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
        Để được hỗ trợ tốt nhất. Hãy gọi
      </Typography>
      <Typography
        component="a"
        href="tel:0911377138"
        sx={{
          fontSize: "26px",
          fontWeight: 600,
          color: "primary.main",
          textAlign: "center",
        }}
      >
        0911 377 138
      </Typography>
      <Divider
        sx={{
          width: "100%",
          "& .MuiDivider-wrapper": {
            fontSize: "14px",
            color: "text.secondary",
          },
        }}
      >
        Hoặc
      </Divider>
      <Button
        variant="contained"
        LinkComponent="a"
        target="_blank"
        href="
https://zalo.me/4337450102506323651
"
        sx={{ color: "common.white", textTransform: "none" }}
      >
        Chat hỗ trợ qua Zalo
      </Button>
    </Stack>
  );
}

export default Contact;
