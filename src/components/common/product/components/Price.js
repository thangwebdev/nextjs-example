"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { numeralCustom } from "~/utils/helpers";
import { useAppContext } from "~/contexts/ContextProvider";
// x - (x * phantram / 100) = price
// => x = price * 100 / (100 - phantram)
function Price({ data, priceSx ={}, noPriceSx={}, oldPriceSx ={} }) {
  const { token } = useAppContext();
  const giaBan = (data.gia_ban_le || 0) * (1 + ((data.thue_suat_nk || 0) / 100))

  return (
    <Stack direction="row" alignItems="center" spacing="10px">
      <Typography
        lineHeight={1}
        sx={{
          color: "primary.main",
          fontSize: "18px",
          fontWeight: 600,
          ...priceSx
        }}
      >
        {token ? (
          `${numeralCustom(giaBan).format()}đ`
        ) : (
          <Typography
            component="span"
            sx={{ color: "error.main", fontWeight: 500, ...noPriceSx }}
          >
            Liên hệ
          </Typography>
        )}
      </Typography>
      {data?.ty_le_ck0 > 0 && (
        <Typography component="del" sx={{fontSize: '14px', color: 'text.primary', ...oldPriceSx}}>
          {numeralCustom(giaBan * 100 / (100 - data.ty_le_ck0)).format()}đ
        </Typography>
      )}
    </Stack>
  );
}

export default Price;
