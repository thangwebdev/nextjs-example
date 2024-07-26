"use client";
import { Box, Stack } from "@mui/material";
import React, { Suspense } from "react";
import Pagination from "~/components/ui/pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filter from "./Filter";
import { LIMIT } from "~/utils/ui-constants";
import SidebarFilterMobile from "~/components/common/sidebar-filter/SidebarFilterMobile";

function ListActionsComp({
  rowCount = 0,
  hideSort,
  wrapperPaginationSx = {},
  wrapperSidebarSx = {},
  hideNextButton = true,
  hidePrevButton = true,
  groups = [],
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", Number(newPage || 1));
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  const currentPage = searchParams.get("page");

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <Box>
        <Box sx={{ display: { xs: "block", md: "none" }, ...wrapperSidebarSx }}>
          <SidebarFilterMobile groups={groups} />
        </Box>
      </Box>
      <Box sx={wrapperPaginationSx}>
        <Pagination
          currentPage={Number(currentPage) || 1}
          rowCount={rowCount || 0}
          rowsPerPage={LIMIT}
          hideNextButton={hideNextButton}
          hidePrevButton={hidePrevButton}
          onChangePage={handlePageChange}
        />
      </Box>
      {hideSort ? <Box></Box> : <Filter />}
    </Stack>
  );
}

function ListActions({
  rowCount = 0,
  hideSort,
  wrapperPaginationSx = {},
  wrapperSidebarSx = {},
  hideNextButton = true,
  hidePrevButton = true,
  groups = [],
}) {
  return (
    <Suspense>
      <ListActionsComp
        rowCount={rowCount}
        hideSort={hideSort}
        wrapperPaginationSx={wrapperPaginationSx}
        wrapperSidebarSx={wrapperSidebarSx}
        hideNextButton={hideNextButton}
        hidePrevButton={hidePrevButton}
        groups={groups}
      />
    </Suspense>
  );
}
export default ListActions;
