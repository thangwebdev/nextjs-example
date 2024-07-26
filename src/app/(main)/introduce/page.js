import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";

function IntroducePage() {
  return (
    <Box sx={{ py: 2, backgroundColor: "background.default" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Image
              src="/introduce.jpg"
              alt="Introduce"
              width={400}
              height={400}
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Stack sx={{ py: { xs: 0, md: 2 } }}>
              <Typography variant="h2" sx={{ color: "primary.main" }}>
                Giới thiệu về Thiên Thủy
              </Typography>
              <Stack spacing={2} sx={{ pt: { xs: 1, md: 2 } }}>
                <Typography>
                  Cơ sở đăng ký trang thiết bị y tế cam kết:
                </Typography>
                <Typography>
                  1. Cung cấp đầy đủ thành phần hồ sơ và nội dung thông tin hồ
                  sơ cấp giấy chứng nhận lưu hành tự do trang thiết bị y tế là
                  chính xác, hợp pháp và theo đúng quy định. Nếu có sự giả mạo,
                  không đúng sự thật cơ sở xin chịu hoàn toàn trách nhiệm và sẽ
                  bị xử phạt theo quy định của pháp luật.
                </Typography>
                <Typography>
                  2. Bảo đảm và duy trì các điều kiện đã công bố trong quá trình
                  sản xuất.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default IntroducePage;
