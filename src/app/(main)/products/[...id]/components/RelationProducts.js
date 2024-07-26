import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Product from "~/components/common/product/Product";
import Carousel from "~/components/ui/carousel/Carousel";
import { asyncGetList } from "~/utils/httpRequest";
import Link from "next/link";
import Image from "next/image";

async function RelationProducts({ product }) {
  const response = await asyncGetList({
    apiCode: "dmvt",
    condition: {
      page: 1,
      limit: 99999,
      q: { ma_nvt: product?.ma_nvt, ma_vt: { $ne: product?.ma_vt } },
    },
  });

  let products = [];
  if (response?.status === 200) {
    products = response.data || [];
  }

  if (!products || products?.length <= 0) return null;

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        p: 2,
        borderRadius: "10px",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Image src="/thunder.png" alt="thunder" width={50} height={50} />
        <Typography
          component={Link}
          href={{ pathname: "/products", query: { group: product?.ma_nvt } }}
          variant="h3"
          sx={{ fontWeight: 500, color: "common.white" }}
        >
          Sản phẩm tương tự
        </Typography>
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
        pagination={false}
        items={(products || []).map((product) => {
          return <Product key={product._id} data={product} />;
        })}
      />
    </Box>
  );
}

export default RelationProducts;
