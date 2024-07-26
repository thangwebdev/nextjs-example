"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { AUTHENTICATED } from "~/utils/constants";
import useAlert from "~/hooks/useAlert";
import DialogAlert from "~/components/ui/dialog/DialogAlert";
import { asyncGetList } from "~/utils/httpRequest";
import useInfiniteScroll from "react-infinite-scroll-hook";

function Search() {
  const { showAlert, open, title, type, width, message, onClose } = useAlert();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);
  const timerRef = useRef();

  // get data
  const handleGetData = async (searchValue, page, prevOptions = []) => {
    try {
      if (loading) return;
      setLoading(true);
      const selfCondition = {
        page,
        limit: 10,
        q: {},
      };
      if (searchValue) {
        selfCondition.q.$or = [
          {
            ma_vt: {
              $regex: searchValue.split(" ").join(".*"),
              $options: "i",
            },
          },
          {
            ten_vt: {
              $regex: searchValue.split(" ").join(".*"),
              $options: "i",
            },
          },
        ];
      }
      const resp = await asyncGetList({
        apiCode: "dmvt",
        condition: selfCondition,
      });
      const respCount = await asyncGetList({
        apiCode: "dmvt",
        condition: { ...selfCondition, count: 1 },
      });
      if (resp.status === 200) {
        setOptions([...prevOptions, ...(resp.data || [])]);
      }
      if (respCount.status === 200) {
        setCount(respCount?.data?.rows_number || 0);
      }
    } catch (error) {
      showAlert({
        width: "400px",
        message: error?.response?.data?.erorr || "Có lỗi xảy ra",
        title: "Thông báo",
        type: "error",
      });
    } finally {
      setLoading(false);
      setPage(page + 1);
    }
  };

  const hasNextPage = options.length < count;

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      handleGetData(search, page, options);
    },
  });

  const renderLoading = (sentryRef, key) => {
    return (
      <Stack
        key={key}
        ref={sentryRef}
        direction="row"
        gap={1}
        sx={{ width: "100%", px: 2 }}
      >
        <Skeleton
          sx={{ width: "10%", height: "16px" }}
          variant="text"
          animation="wave"
        />
        <Skeleton
          sx={{ width: "50%", height: "16px" }}
          variant="text"
          animation="wave"
        />
      </Stack>
    );
  };

  useEffect(() => {
    if (search?.length >= 3) {
      // handleResetWhenSearchChange();
      handleGetData(search, 1, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setSearch(searchText);
    }, 500);
    return () => clearTimeout(timerRef.current);
  }, [searchText]);

  if (!AUTHENTICATED) return null;

  return (
    <>
      <DialogAlert
        open={open}
        onClose={onClose}
        title={title}
        message={message}
        type={type}
        width={width}
      />
      <Box>
        <Autocomplete
          freeSolo
          options={options || []}
          clearIcon={null}
          forcePopupIcon={false}
          inputValue={searchText}
          clearOnBlur={false}
          onInputChange={(_, val) => {
            setSearchText(val);
          }}
          onChange={(_, val) => {
            console.log(val);
          }}
          sx={{ borderRadius: "6px" }}
          noOptionsText={
            <Stack alignItems="center" spacing={2}>
              <Image src="/opps.png" alt="Empty" width={80} height={80} />
              <Typography sx={{ fontSize: "16px" }}>
                Thật tiếc! Không tìm thấy kết quả nào phù hợp
              </Typography>
            </Stack>
          }
          // PopperComponent={({ style, children, ...restProps }) => {
          //   return (
          //     <Popper
          //       {...restProps}
          //       style={{
          //         ...style,
          //         paddingTop: "8px",
          //       }}
          //     >
          //       {children}
          //     </Popper>
          //   );
          // }}
          // PaperComponent={({ children, ...restProps }) => {
          //   return (
          //     <Paper
          //       {...restProps}
          //       onMouseDown={(event) => event.preventDefault()}
          //     >
          //       {children}
          //       <Box
          //         sx={{ p: 1, borderTop: "1px dashed", borderColor: "divider" }}
          //       >
          //         <Stack direction="row" alignItems="center" gap={1}>
          //           <Image
          //             src="/hot.png"
          //             width={20}
          //             height={20}
          //             quality={100}
          //             priority
          //             alt="Hot"
          //           />
          //           <Typography sx={{ fontWeight: 500 }}>
          //             Tìm kiếm nhiều nhất
          //           </Typography>
          //         </Stack>
          //         <Stack
          //           direction="row"
          //           alignItems="center"
          //           flexWrap="wrap"
          //           gap={1}
          //           sx={{ mt: 1 }}
          //         >
          //           {KEYWORDS.map((kw) => (
          //             <Button
          //               key={kw}
          //               LinkComponent={Link}
          //               href={`/products?keyword=${kw}`}
          //               variant="contained"
          //               sx={{
          //                 px: 1,
          //                 py: 0.5,
          //                 textTransform: "none",
          //                 height: "auto",
          //                 borderRadius: "20px",
          //                 backgroundColor: "primary.100",
          //                 "&:hover": {
          //                   backgroundColor: "primary.100",
          //                 },
          //               }}
          //             >
          //               {kw}
          //             </Button>
          //           ))}
          //         </Stack>
          //       </Box>
          //     </Paper>
          //   );
          // }}
          filterOptions={(options) => {
            if (hasNextPage) {
              options.push({ id: "load-more" });
            }
            return options;
          }}
          renderOption={({ key, className, ...optionProps }, option) => {
            if (option.id === "load-more") {
              return renderLoading(sentryRef, "1234");
            }
            return (
              <ListItem
                key={option._id || option.id}
                {...optionProps}
                sx={{
                  display: "block",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "primary.opacity" },
                }}
              >
                {option.ten_vt}
              </ListItem>
            );
          }}
          getOptionLabel={(option) => option.ten_vt || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Tìm kiếm theo tên hàng hóa"
              autoComplete="off"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "common.white",
                borderRadius: "6px",
                "& .MuiInputBase-root": { padding: "0 5px 0 0 !important" },

                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  height: "45px",
                  padding: "0px 16px !important",
                  "&:placeholder": {
                    fontSize: "16px",
                  },
                },
                "& fieldset": {
                  border: "none",
                },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <IconButton>
                    <CiSearch size={25} />
                  </IconButton>
                ),
              }}
            />
          )}
        />
      </Box>
    </>
  );
}

export default Search;
