import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import ChangeNumber from "./components/ChangeNumber";
import { generateLinkImage } from "~/utils/helpers";
import Price from "./components/Price";
import Label from "./components/Label";

const borderRadius = "10px";

function Product({ data }) {
  const thumbnail = data?.picture || data?.picture2 || data?.picture3;

  const random = Math.floor(Math.random() * (1000 - 51) + 51);

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "background.paper",
        borderRadius,
        color: "primary.main",
        transition: "all linear 0.1s",
      }}
    >
      <Link href={`/products/${data?._id}/${data.ma_dvt}`}>
        <Box
          className="product-img-wrapper"
          sx={{ width: "100%", height: "auto", position: "relative" }}
        >
          {/* Percent */}
          {data?.ty_le_ck0 > 0 && (
            <Stack
              direction="row"
              alignItems="cener"
              justifyContent="center"
              sx={{
                position: "absolute",
                zIndex: 2,
                top: 0,
                left: 0,
                padding: 0.5,
                backgroundColor: "error.main",
                borderRadius: `${borderRadius} 0 ${borderRadius} 0`,
              }}
            >
              <Typography fontSize={12} sx={{ color: "common.white" }}>
                -{data?.ty_le_ck0}%
              </Typography>
            </Stack>
          )}
          {/* Image */}
          <Box sx={{ paddingTop: "80%", position: "relative", zIndex: 1 }}>
            <Image
              src={
                thumbnail ? generateLinkImage(thumbnail) : "/no_thumbnail.png"
              }
              alt={data?.ten_vt || "product image"}
              width={`${100}`}
              height={`${100}`}
              priority
              quality={100}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: `${borderRadius} ${borderRadius} 0 0`,
              }}
            />
            {/* Đơn vị tính */}
            <Chip
              component="span"
              variant="filled"
              label={data?.ten_dvt || ""}
              size="small"
              color="secondary"
              sx={{
                position: "absolute",
                zIndex: 10,
                top: "5px",
                right: "5px",
                "& .MuiChip-label": {
                  textTransform: "capitalize",
                },
              }}
            />
            {/* Mode */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                flexWrap: "wrap",
              }}
            >
              {data?.bestseller && <Label label="Bán chạy" color="secondary" />}
              {data?.banner_small && <Label label="Hàng nổi" color="error" />}
              {data?.hot && <Label label="Hot" color="warning" />}
              {data?.newproduct && <Label label="Mới" color="info" />}
              {data?.exfields?.hoa_don && (
                <Label label="Hóa đơn" color="primary" />
              )}
            </Stack>
          </Box>
        </Box>
        <Stack sx={{ flex: 1 }}>
          <Stack sx={{ padding: "10px 10px 20px 10px" }} spacing="2px">
            <Price data={data} />
            <Typography
              title={data?.ten_vt}
              className="two-lines-ellipsis"
              component="span"
              fontWeight={500}
              sx={{
                whiteSpace: "wrap",
                lineBreak: "anywhere",
                color: "text.primary",
                lineHeight: 1.4,
                "&:hover": { color: "primary.main" },
                transition: "all linear 0.1s",
              }}
            >
              {data?.ten_vt}
            </Typography>

            {data?.quy_cach && (
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "text.primary",
                  fontStyle: "italic",
                }}
              >
                {data?.quy_cach}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Link>
      <Box sx={{ marginTop: "auto" }}>
        <Link href={`/products/${data?._id}/${data.ma_dvt}`}>
          <Stack spacing="4px" sx={{ marginTop: "auto" }}>
            <Box sx={{ width: "100%", padding: "0 10px" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "16px",
                  backgroundColor: "error.200",
                  borderRadius: "10px",
                  position: "relative",
                  "&:before": {
                    position: "absolute",
                    zIndex: 1,
                    content: "''",
                    top: 0,
                    left: 0,
                    width: `${(random / 1000) * 100}%`,
                    height: "100%",
                    backgroundColor: "error.main",
                    borderRadius: "10px 0 0 10px",
                  },
                  "&:after": {
                    position: "absolute",
                    zIndex: 2,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "10px",
                    fontWeight: 500,
                    content: `'Đã bán ${random}'`,
                    color: "#000",
                  },
                }}
              ></Box>
            </Box>
            {/* <Typography
            sx={{
              color: "text.primary",
              fontSize: "10px",
              fontWeight: 400,
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            Đặt tối đa 100 sản phẩm
          </Typography> */}
          </Stack>
        </Link>
        {/* Add to cart */}
        <ChangeNumber product={data} />
      </Box>
    </Stack>
  );
}

export default Product;
