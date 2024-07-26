"use client";
import React, { Suspense } from "react";
import { Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { PRODUCT_MODES } from "~/utils/ui-constants";
import Image from "next/image";

function EmptyComp({ groups }) {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword");
  const group = groups.find((g) => g._id === searchParams.get("group"));
  const filter = PRODUCT_MODES.find(
    (mode) => mode.filter === Number(searchParams.get("filter") || -1)
  );

  return (
    <Stack alignItems="center" gap={1}>
      <Typography sx={{ textAlign: "center" }}>
        Không tìm thấy sản phẩm
      </Typography>
      <Image src="/opps.png" alt="opps" width={200} height={200} />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        gap={2}
      >
        <Typography sx={{ textAlign: "center", color: "primary.main" }}>
          {`${!!keyword ? `Từ khóa: ${keyword}` : ""}`}
        </Typography>
        <Typography sx={{ textAlign: "center", color: "secondary.main" }}>
          {`${!!group ? `Nhóm hàng: ${group.ten_nvt}` : ""}`}
        </Typography>
        <Typography sx={{ textAlign: "center", color: "error.main" }}>
          {`${!!filter ? `Tag: ${filter.name}` : ""}`}
        </Typography>
      </Stack>
    </Stack>
  );
}
function Empty({ groups }) {
  return (
    <Suspense>
      <EmptyComp groups={groups} />
    </Suspense>
  );
}
export default Empty;
