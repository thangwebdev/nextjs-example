import React from "react";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import NavigatePage from "~/components/ui/navigate-page/NavigatePage";
import { asyncGet, asyncGetList } from "~/utils/httpRequest";
import Image from "next/image";
import { generateLinkImage } from "~/utils/helpers";
import Labels from "./components/Labels";
import Description from "./components/Description";
import RelationProducts from "./components/RelationProducts";
import ChangeNumber from "~/components/common/product/components/ChangeNumber";
import Contact from "./components/Contact";
import Price from "~/components/common/product/components/Price";

export const metadata = { title: "Chi tiết sản phẩm" };

async function DetailPage({ params }) {
  const [id, ma_dvt] = params.id;
  const response = await asyncGet({ apiCode: "dmvt", id });
  let product = null;
  if (response?.status === 200) {
    product = response.data;
  }

  if (!!product && product?.ma_dvt !== decodeURIComponent(ma_dvt)) {
    const respDvt = await asyncGetList({
      apiCode: "dmqddvt",
      condition: {
        page: 1,
        limit: 1,
        q: { ma_vt: product?.ma_vt, ma_dvt: decodeURIComponent(ma_dvt) },
      },
    });
    if (respDvt.status === 200) {
      const data = respDvt.data[0];
      if (data) {
        product.gia_ban_le = data.gia_ban_nt;
        product.ma_dvt = data.ma_dvt;
        product.ten_dvt = data.ten_dvt;
      } else {
        product = null;
      }
    }
  }

  const thumbnail = product?.picture || product?.picture2 || product?.picture3;

  if (!product) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Không tìm thấy sản phẩm
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "background.default", py: 2 }}>
      <Container>
        <Box mb={1}>
          <NavigatePage
            previousURLs={[
              { name: "Trang chủ", path: "/" },
              { name: "Sản phẩm", path: "/products" },
            ]}
            currentPageName={product?.ten_vt}
          />
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid xs={12} md={4}>
              <Image
                src={
                  thumbnail ? generateLinkImage(thumbnail) : "/no_thumbnail.png"
                }
                alt={product?.ten_vt || "product image"}
                width={400}
                height={400}
                priority
                quality={100}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid xs={12} md={5.5}>
              <Stack
                spacing={2}
                sx={{
                  backgroundColor: "background.paper",
                  p: 2,
                  borderRadius: "10px",
                }}
              >
                <Stack>
                  <Typography variant="h3">
                    {product?.ten_vt}{" "}
                    <Chip
                      component="span"
                      variant="filled"
                      label={product?.ten_dvt || ""}
                      size="small"
                      color="secondary"
                      sx={{
                        "& .MuiChip-label": {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </Typography>
                  {product?.quy_cach && (
                    <Typography sx={{ color: "text.secondary" }}>
                      {product?.quy_cach}
                    </Typography>
                  )}
                </Stack>
                <Price
                  data={product}
                  priceSx={{
                    color: "primary.main",
                    fontSize: "30px",
                    fontWeight: 600,
                  }}
                  noPriceSx={{ color: "error.main", fontWeight: 500 }}
                  oldPriceSx={{ fontSize: "16px" }}
                />
                <Labels product={product} />
                <Box sx={{ width: "100%", maxWidth: "400px" }}>
                  <ChangeNumber
                    product={product}
                    wrapperSx={{
                      border: "2px dashed #33333322",
                      borderRadius: "10px",
                      overflow: "hidden",
                      height: "42px",
                    }}
                    sxMinus={{ color: "error.main" }}
                  />
                </Box>
                <Description data={product?.mieu_ta} />
              </Stack>
            </Grid>
            <Grid xs={12} md={2.5}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Contact />
              </Box>
            </Grid>
          </Grid>
          <Box mt={2}>
            <RelationProducts product={product} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default DetailPage;
