"use client";
import React, { useState, useEffect, useRef, useId } from "react";
import {
  TextField,
  Typography,
  Stack,
  Autocomplete,
  ListItem,
  Button,
  Skeleton,
  ListItemText,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { HiOutlineSelector } from "react-icons/hi";
import useInfiniteScroll from "react-infinite-scroll-hook";
import useAlert from "~/hooks/useAlert";
import DialogAlert from "../dialog/DialogAlert";
import { asyncGetList } from "~/utils/httpRequest";

function SelectApiInput({
  label,
  placeholder,
  required = false,
  selectedValue,
  onSelect = () => {},
  apiCode = "dmvt",
  condition = {},
  getOptionLabel,
  filterOptions = (option) => option,
  renderOption,
  searchFileds = ["ma_vt", "ten_vt"],
  value,
  defaultValue,
  FormAdd,
  errorMessage,
  disabled = false,
  isOpenDm = true,
  autocompleteProps,
  multiple = false,
  sx = {},
  isOptionEqualToValue = () => true,
  withIdApp = true,
  labelWidth = "20%",
  InputProps = {},
  variant = "standard",
  startAdornment,
  readOnly,
  ...props
}) {
  const id = useId();
  const { showAlert, open, title, type, width, message, onClose } = useAlert();
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef();
  const countRenderRef = useRef(1);

  // handle get data
  const handleGetData = async (searchValue, page, oldProps = []) => {
    try {
      setLoading(true);
      const selfCondition = { page, limit: 20, q: condition };
      if (searchValue === "" || searchValue) {
        selfCondition.q.$or = [];
        searchFileds.forEach((searchFiled) =>
          selfCondition.q.$or.push({
            [searchFiled]: {
              $regex: searchValue.split(" ").join(".*"),
              $options: "i",
            },
          })
        );
      }
      const resp = await asyncGetList({
        apiCode,
        condition: selfCondition,
        withIdApp,
      });
      const respCount = await asyncGetList({
        apiCode,
        condition: { ...selfCondition, count: 1 },
        withIdApp,
      });
      if (resp.status === 200) {
        setOptions([...oldProps, ...(resp.data || [])]);
      }
      if (respCount.status === 200) {
        setCount(respCount?.data?.rows_number);
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
    onLoadMore: () => handleGetData(search, page, options),
  });

  const handleReset = () => {
    setSearchText("");
    setOptions([]);
    setPage(1);
    setCount(0);
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

  React.useEffect(() => {
    if ((search === "" || search.length > 1) && countRenderRef.current > 1) {
      handleGetData(search, 1, []);
      setPage(1);
    }
    countRenderRef.current += 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      setSearch(searchText.trim());
    }, 500);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [searchText]);
  useEffect(() => {
    setOptions([]);
  }, [apiCode]);
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
      <Autocomplete
        multiple={multiple}
        readOnly={readOnly}
        disabled={disabled}
        isOptionEqualToValue={isOptionEqualToValue}
        clearOnBlur={false}
        options={options}
        value={value}
        defaultValue={defaultValue}
        onBlur={handleReset}
        clearIcon={selectedValue ? <MdClose size={20} /> : null}
        popupIcon={<HiOutlineSelector size={20} />}
        onChange={(e, newValue) => {
          onSelect(newValue);
        }}
        ListboxProps={{
          className: "custome-scrolly",
          sx: {
            "& .MuiAutocomplete-option": { fontSize: "12px" },
          },
        }}
        noOptionsText={loading ? renderLoading() : undefined}
        getOptionLabel={
          !!getOptionLabel
            ? (option) => {
                const val = getOptionLabel(option);
                return val || "";
              }
            : undefined
        }
        filterOptions={(options) => {
          if (hasNextPage) {
            options.push({ id: "load-more" });
          }
          return options;
        }}
        renderOption={(optionProps, option, state, ownerState) => {
          if (option.id === "load-more") {
            return renderLoading(sentryRef, "1234");
          }
          const { key, ...restProps } = optionProps;
          return (
            <ListItem key={key} {...restProps} sx={{ fontSize: "16px" }}>
              <ListItemText>{ownerState.getOptionLabel(option)}</ListItemText>
            </ListItem>
          );
        }}
        sx={{ width: "100%", ...sx }}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            helperText={errorMessage}
            error={!!errorMessage}
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => {
              handleGetData("", 1, []);
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment,
              ...InputProps,
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                border: "2px solid",
                borderColor: "divider",
                color: "text.secondary",
                "&:focus-within": {
                  borderColor: "primary.main",
                },
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  color: "text.primary",
                  px: !!startAdornment ? 2 : "",
                },
                "& fieldset": {
                  border: "none",
                  outline: "none",
                },
              },
            }}
          />
        )}
        {...autocompleteProps}
      />
    </>
  );
}

export default SelectApiInput;
