import Link from "next/link";
import Image from "next/image";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "common.white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "450px",
          height: "450px",
          backgroundColor: "primary.100",
          borderRadius: "100%",
          transform: "translate(-20%, -30%)",
        }}
      ></Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Container>
          <Box sx={{ padding: "20px 0px" }}>
            <Typography sx={{ color: "secondary.main", fontWeight: 400 }}>
              <b>ttmed.vn</b>{" "}
              <span>
                là website thuộc sở hữu của công ty TNHH Thương Mại Dược Phẩm
                Thiên Thủy
              </span>
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <Grid container spacing="20px">
                {/* Column 1 */}
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Công Ty TNHH Thương Mại Dược Phẩm Thiên Thủy
                    </Typography>
                    <Stack spacing="10px" sx={{ marginTop: "10px" }}>
                      <Stack>
                        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                          Địa chỉ:
                        </Typography>
                        <Typography>
                          496/83 Dương Quảng Hàm, phường 6, quận Gò Vấp, TP. HCM
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                          Số Chứng Nhận ĐKKD:
                        </Typography>
                        <Typography>
                          0314039199, Cấp Ngày 08/04/2021, Tại Cục Trưởng Cục
                          Cảnh Sát Quản Lý Hành Chính Về Trật Tự Xã Hội
                        </Typography>
                      </Stack>
                      {/* <Stack>
                        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                          Số Giấy Phép Sàn Thương Mại Điện Tử:
                        </Typography>
                        <Typography>0314758651/KD-0368</Typography>
                      </Stack> */}
                    </Stack>
                  </Box>
                </Grid>
                {/* Column 2 */}
                <Grid item xs={12} sm={6} md={2.5}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Thông Tin Chung
                    </Typography>
                    <Stack spacing="5px" sx={{ marginTop: "10px" }}>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Thông Tin Về ttmed.vn
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Quy Chế Hoạt Động
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Điều Khoản Sử Dụng
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Bảo Mật
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Giải Quyết Khiếu Nại
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Đăng Tải Sản Phẩm
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Đổi Trả
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Vận Chuyển
                        </Typography>
                      </Link>
                    </Stack>
                  </Box>
                </Grid>
                {/* Column 3 */}
                <Grid item xs={12} sm={6} md={2.5}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Stack>
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Hỗ Trợ Người Sử Dụng
                      </Typography>
                      <Stack spacing="5px" sx={{ marginTop: "10px" }}>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            Câu Hỏi Thường Gặp
                          </Typography>
                        </Link>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            Hướng Dẫn Đăng Tải Sản Phẩm
                          </Typography>
                        </Link>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            Hướng Dẫn Đặt Hàng Và Thanh Toán
                          </Typography>
                        </Link>
                      </Stack>
                    </Stack>
                    <Stack sx={{ marginTop: "10px" }}>
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Dịch Vụ Giao Hàng
                      </Typography>
                      <Stack
                        direction="row"
                        spacing="5px"
                        sx={{ marginTop: "10px" }}
                      >
                        <Box
                          sx={{ width: "fit-content", height: "fit-content" }}
                        >
                          <Image
                            src="/viettel_post.svg"
                            alt="anh viettel"
                            width={62}
                            height={24}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
                {/* Column 4 */}
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Stack>
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Kết Nối Với Chúng Tôi
                      </Typography>
                      <Stack
                        direction="row"
                        spacing="10px"
                        sx={{ marginTop: "10px" }}
                      >
                        <Link href="/" target="_blank">
                          <Image
                            src="/facebook.svg"
                            alt="anh facebook"
                            width={25}
                            height={25}
                          />
                        </Link>
                        <Link href="/" target="_blank">
                          <Image
                            src="/zalo.svg"
                            alt="anh zalo"
                            width={25}
                            height={25}
                          />
                        </Link>
                        <Link href="/" target="_blank">
                          <Image
                            src="/linkedin.svg"
                            alt="anh linkedin"
                            width={25}
                            height={25}
                          />
                        </Link>
                        <Link href="/" target="_blank">
                          <Image
                            src="/tiktok.svg"
                            alt="anh tiktok"
                            width={25}
                            height={25}
                          />
                        </Link>
                      </Stack>
                    </Stack>
                    <Stack sx={{ marginTop: "10px" }}>
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Liên Hệ
                      </Typography>
                      <Stack spacing="5px" sx={{ marginTop: "10px" }}>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            ctythienthuy168@gmail.com
                          </Typography>
                        </Link>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            0911 377 138 (Từ T2 đến T7: 8h-17h)
                          </Typography>
                        </Link>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "20px 0px",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography sx={{ color: "common.black", textAlign: "center" }}>
              © Bản quyền thuộc Công Ty TNHH Thương Mại Dược Phẩm Thiên Thủy -
              2024
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
