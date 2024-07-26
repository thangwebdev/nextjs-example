import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { asyncGetList } from "~/utils/httpRequest";
import Product from "../product/Product";
import Carousel from "~/components/ui/carousel/Carousel";
import Link from "next/link";

async function CarouselProduct({
  image,
  title,
  filter = 0,
  conditionField = "bestseller",
  wrapperSx = {},
  titleSx = {},
  showMore = false,
  showMoreSx = {},
}) {
  const response = await asyncGetList({
    apiCode: "dmvt",
    condition: { page: 1, limit: 99999, q: { [conditionField]: true } },
  });

  const productsData = response?.data || [];
  const products = [];

  for (let i = 0; i < productsData.length; i++) {
    const currentProduct = productsData[i];
    products.push({ ...currentProduct });
    const respDvts = await asyncGetList({
      apiCode: "dmqddvt",
      condition: {
        page: 1,
        limit: 9999,
        q: {
          ma_vt: currentProduct.ma_vt,
          ma_dvt: { $ne: currentProduct.ma_dvt },
        },
      },
    });
    if (respDvts.status === 200) {
      respDvts.data.forEach((dvt) => {
        products.push({
          ...currentProduct,
          gia_ban_le: dvt.gia_ban_nt || 0,
          ma_dvt: dvt?.ma_dvt || "",
          ten_dvt: dvt?.ten_dvt || "",
        });
      });
    }
  }

  return (
    <Box sx={{ ...wrapperSx }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        {image && <Image src={image} alt="commit" width={50} height={50} />}
        {title && (
          <Typography
            component={Link}
            href={{ pathname: "/products", query: { filter } }}
            variant="h3"
            sx={{ fontWeight: 500, ...titleSx }}
          >
            {title}
          </Typography>
        )}
      </Stack>
      <Carousel
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 8,
          },
        }}
        loop
        spaceBetween={8}
        pagination={false}
        items={(products || []).map((product) => {
          return (
            <Product key={`${product._id}_${product.ma_dvt}`} data={product} />
          );
        })}
      />
      {showMore && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          <Button
            LinkComponent={Link}
            href={{ pathname: "/products", query: { filter } }}
            endIcon={<FaArrowRight size={18} />}
            sx={{
              height: "42px",
              fontWeight: 600,
              fontSize: "18px",
              ...showMoreSx,
            }}
          >
            Xem tất cả
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default CarouselProduct;
