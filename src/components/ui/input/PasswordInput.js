"use client";
import React, { useState } from "react";
import { IconButton, InputLabel, Stack, TextField } from "@mui/material";
import { HiEyeOff, HiEye } from "react-icons/hi";

function PasswordInput({
  placeholder,
  startAdornment,
  InputProps = {},
  inputProps = {},
  sx = {},
  id,
  register = () => {},
  name,
  value,
  onChange,
  errorMessage,
  disabled,
  required,
  label,
}) {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <Stack spacing={0.5}>
      {label && (
        <InputLabel
          htmlFor={id}
          sx={{
            fontWeight: 500,
            "& .MuiFormLabel-asterisk": { color: "error.main" },
          }}
          required={required}
        >
          {label}
        </InputLabel>
      )}
      <TextField
        id={id}
        autoComplete="off"
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        type={isPassword ? "password" : "text"}
        variant="outlined"
        placeholder={placeholder}
        InputProps={{
          startAdornment,
          ...InputProps,
          endAdornment: (
            <IconButton onClick={() => setIsPassword(!isPassword)}>
              {isPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </IconButton>
          ),
        }}
        inputProps={inputProps}
        helperText={errorMessage}
        error={!!errorMessage}
        {...register(name)}
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
          ...sx,
        }}
      />
    </Stack>
  );
}

export default PasswordInput;
