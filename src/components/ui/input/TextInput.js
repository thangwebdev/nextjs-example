import React from "react";
import { InputLabel, Stack, TextField } from "@mui/material";

function TextInput({
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
  fullWidth = false,
  readOnly,
  required,
  label,
}) {
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
        fullWidth={fullWidth}
        spellCheck={false}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        variant="outlined"
        placeholder={placeholder}
        InputProps={{
          startAdornment,
          readOnly,
          autoComplete: "off",
          ...InputProps,
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

export default TextInput;
