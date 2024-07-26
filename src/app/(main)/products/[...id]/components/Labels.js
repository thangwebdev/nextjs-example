import React from "react";
import { Stack } from "@mui/material";
import Label from "~/components/common/product/components/Label";

function Labels({ product }) {
  return (
    <Stack direction="row" alignItems="center">
      {product?.bestseller && (
        <Label
          label="Bán chạy"
          color="secondary"
          sx={{ height: "30px" }}
          labelSx={{ fontSize: "16px" }}
        />
      )}
      {product?.banner_small && (
        <Label
          label="Hàng nổi"
          color="error"
          sx={{ height: "30px" }}
          labelSx={{ fontSize: "16px" }}
        />
      )}
      {product?.hot && (
        <Label
          label="Hot"
          color="warning"
          sx={{ height: "30px" }}
          labelSx={{ fontSize: "16px" }}
        />
      )}
      {product?.newproduct && (
        <Label
          label="Mới"
          color="info"
          sx={{ height: "30px" }}
          labelSx={{ fontSize: "16px" }}
        />
      )}
      {product?.exfields?.hoa_don && (
        <Label
          label="Hóa đơn"
          color="primary"
          sx={{ height: "30px" }}
          labelSx={{ fontSize: "16px" }}
        />
      )}
    </Stack>
  );
}

export default Labels;
