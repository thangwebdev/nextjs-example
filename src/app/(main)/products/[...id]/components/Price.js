"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { useAppContext } from "~/contexts/ContextProvider";
import { numeralCustom } from "~/utils/helpers";

function Price({ product }) {
  const { token } = useAppContext();
  return (
    <Stack direction="row" alignItems="center" spacing="10px">
      <Typography
        lineHeight={1}
        sx={{
          color: "primary.main",
          fontSize: "30px",
          fontWeight: 600,
        }}
      >
        {token ? (
          `${numeralCustom(product?.gia_ban_le).format()}đ`
        ) : (
          <Typography
            component="span"
            sx={{ color: "error.main", fontWeight: 500 }}
          >
            Liên hệ
          </Typography>
        )}
      </Typography>
      {product?.ty_le_ck0 > 0 && (
        <Typography component="del" sx={{ fontSize: "16px" }}>
          {numeralCustom(
            (product.gia_ban_le * 100) / (100 - product.ty_le_ck0)
          ).format()}
          đ
        </Typography>
      )}
    </Stack>
  );
}

export default Price;
