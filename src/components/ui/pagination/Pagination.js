"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function Pagiation({
  rowCount,
  rowsPerPage,
  currentPage,
  onChangePage,
  hideNextButton,
  hidePrevButton,
}) {
  const [pageValue, setPageValue] = useState(currentPage || 1);

  const handlePageChange = () => {
    if (pageValue === currentPage) return;
    let valueToSet = pageValue;
    if (valueToSet < 1) valueToSet = 1;
    if (valueToSet > maxPage) valueToSet = maxPage;
    setPageValue(valueToSet);
    onChangePage(valueToSet);
  };

  const renderInput = () => {
    return (
      <TextField
        type="number"
        value={pageValue}
        inputProps={{ min: 1, max: maxPage }}
        autoComplete="off"
        onChange={(e) => {
          setPageValue(Number(e.target.value));
        }}
        onBlur={handlePageChange}
        onKeyUp={(e) => {
          if (e.which === 13) {
            handlePageChange();
          }
        }}
        sx={{
          "& .MuiInputBase-root": {
            paddingLeft: 0,
            width: "60px",
          },
          "& .MuiFormLabel-root": {
            fontSize: "16px",
            fontWeight: 600,
            color: "primary.main",
            paddingRight: "5px",
            transform: "translate(14px, -12px)",
            backgroundColor: "common.white",
          },
          "& .MuiInputBase-input": {
            fontSize: "16px",
            height: "32px",
            padding: "2px 4px",
            textAlign: "center",
          },
        }}
      />
    );
  };

  const maxPage = useMemo(() => {
    let result = Math.floor(rowCount / rowsPerPage);
    if (rowCount % rowsPerPage !== 0) {
      ++result;
    }
    return result;
  }, [rowCount, rowsPerPage]);

  useEffect(() => {
    setPageValue(currentPage);
  }, [currentPage]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        padding: "0 10px",
      }}
      spacing={1}
    >
      <Pagination
        count={maxPage}
        page={pageValue}
        onChange={(_, newPage) => {
          onChangePage(newPage);
          setPageValue(newPage);
        }}
        shape="rounded"
        variant="text"
        size="medium"
        hideNextButton={hideNextButton}
        hidePrevButton={hidePrevButton}
        boundaryCount={1}
        siblingCount={1}
        color="primary"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiPaginationItem-root": {
            fontSize: "16px",
            "&.Mui-selected": {
              color: "common.white",
            },
          },
        }}
      />
      <Box sx={{ display: { xs: "none", sm: "block" } }}>{renderInput()}</Box>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton
          sx={{ width: "42px", height: "42px" }}
          onClick={() => {
            const prevPage = pageValue - 1;
            if (prevPage >= 1) {
              onChangePage(prevPage);
              setPageValue(prevPage);
            }
          }}
        >
          <FaChevronLeft size={16} />
        </IconButton>
        {renderInput()}
        <IconButton
          sx={{ width: "42px", height: "42px" }}
          onClick={() => {
            const nextPage = pageValue + 1 > maxPage ? maxPage : pageValue + 1;
            if (pageValue < maxPage) {
              onChangePage(nextPage);
              setPageValue(nextPage);
            }
          }}
        >
          <FaChevronRight size={16} />
        </IconButton>
        <Typography
          sx={{ fontWeight: 500, display: { xs: "block", sm: "none" } }}
        >
          {"/ "} {maxPage} Trang
        </Typography>
      </Box>
    </Stack>
  );
}

export default Pagiation;
