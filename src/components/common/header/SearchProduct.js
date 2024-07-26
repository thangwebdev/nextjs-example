"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import useAlert from "~/hooks/useAlert";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { AUTHENTICATED } from "~/utils/constants";
import { asyncGetList } from "~/utils/httpRequest";
import Image from "next/image";
import { KEYWORDS } from "~/utils/ui-constants";
import Link from "next/link";
import DialogAlert from "~/components/ui/dialog/DialogAlert";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { generateLinkImage } from "~/utils/helpers";
import { useAppContext } from "~/contexts/ContextProvider";

function SearchProductComp() {
  const searchParams = useSearchParams();
  const { token } = useAppContext();
  const { showAlert, open, title, type, width, message, onClose } = useAlert();
  const [openPopper, setOpenPopper] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);

  const router = useRouter();
  const anchor = useRef();
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

  const handleClose = () => {
    setOpenPopper(false);
    setSearchText(searchParams.get("keyword") || "");
  };

  const handleResetWhenSearchChange = () => {
    setOptions([]);
  };

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
          sx={{ width: "10%", height: "24px" }}
          variant="text"
          animation="wave"
        />
        <Skeleton
          sx={{ width: "50%", height: "24px" }}
          variant="text"
          animation="wave"
        />
      </Stack>
    );
  };

  useEffect(() => {
    if (search?.length >= 3) {
      handleResetWhenSearchChange();
      handleGetData(search, 1, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setSearch(searchText.trim());
    }, 500);
    return () => clearTimeout(timerRef.current);
  }, [searchText]);

  useEffect(() => {
    setSearchText(searchParams.get("keyword") || "");
  }, [searchParams]);

  // if (!token) return null;

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
      <ClickAwayListener onClickAway={handleClose}>
        <Box sx={{ width: "100%" }} ref={anchor}>
          <TextField
            value={searchText}
            spellCheck={false}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setSearchText(e.target.value)}
            onClick={() => setOpenPopper(!openPopper)}
            onKeyUp={(e) => {
              if (e.which === 13) {
                router.push(`/products?keyword=${searchText}`);
                setOpenPopper(false);
              }
            }}
            fullWidth
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
              autoComplete: "off",
              endAdornment: (
                <IconButton
                  LinkComponent={Link}
                  href={`/products?keyword=${searchText}`}
                  onClick={() => setOpenPopper(false)}
                  // sx={{ pointerEvents: !searchText ? "none" : "all" }}
                >
                  <CiSearch size={25} />
                </IconButton>
              ),
            }}
          />
          {/* Popper */}
          <Popper
            open={openPopper}
            anchorEl={anchor.current}
            sx={{
              width: anchor.current?.clientWidth,
              zIndex: 120,
            }}
          >
            <Paper sx={{ width: "100%", mt: 0.5, py: 1 }}>
              {loading && options?.length <= 0 ? (
                renderLoading()
              ) : (
                <>
                  {!options || options.length <= 0 ? (
                    <Stack alignItems="center" spacing={1}>
                      <Image
                        src="/opps.png"
                        alt="Empty"
                        width={80}
                        height={80}
                      />
                      <Typography
                        sx={{ fontSize: "16px", color: "text.secondary" }}
                      >
                        {!searchText
                          ? "Nhập từ 3 từ khóa để tìm kiếm theo tên thuốc"
                          : "Thật tiếc! Không tìm thấy kết quả nào phù hợp"}
                      </Typography>
                    </Stack>
                  ) : (
                    <List
                      disablePadding
                      sx={{ maxHeight: "40vh", overflow: "auto" }}
                    >
                      {(options || []).map((option) => {
                        const imageUrl =
                          option.picture_thumb ||
                          option.picture ||
                          option.picture2 ||
                          option.picture3;
                        return (
                          <ListItemButton
                            key={option._id}
                            sx={{ px: 2, py: 0.5 }}
                            LinkComponent={Link}
                            href={`/products/${option._id}`}
                            onClick={() => setOpenPopper(false)}
                          >
                            <ListItemAvatar>
                              <Image
                                src={
                                  !imageUrl
                                    ? "/no_thumbnail.png"
                                    : generateLinkImage(imageUrl)
                                }
                                alt="Product image"
                                width={50}
                                height={50}
                              />
                            </ListItemAvatar>
                            <ListItemText>
                              {option.ten_vt} ({option.ten_dvt})
                            </ListItemText>
                          </ListItemButton>
                        );
                      })}
                      {hasNextPage && renderLoading(sentryRef, "1234")}
                    </List>
                  )}
                </>
              )}
              {/* hot words */}
              <Box
                sx={{
                  p: 1,
                  mt: 1,
                  borderTop: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <Image
                    src="/hot.png"
                    width={20}
                    height={20}
                    quality={100}
                    priority
                    alt="Hot"
                  />
                  <Typography sx={{ fontWeight: 500 }}>
                    Tìm kiếm nhiều nhất
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                  sx={{ mt: 1 }}
                >
                  {KEYWORDS.map((kw) => (
                    <Button
                      key={kw}
                      LinkComponent={Link}
                      onClick={() => setOpenPopper(false)}
                      href={`/products?keyword=${kw}`}
                      variant="contained"
                      sx={{
                        px: 1,
                        py: 0.5,
                        textTransform: "none",
                        height: "auto",
                        borderRadius: "20px",
                        backgroundColor: "primary.100",
                        "&:hover": {
                          backgroundColor: "primary.100",
                        },
                      }}
                    >
                      {kw}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
}

function SearchProduct() {
  return (
    <Suspense>
      <SearchProductComp />
    </Suspense>
  );
}
export default SearchProduct;

