"use client";
import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { InputLabel, Stack } from "@mui/material";

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  line-height: 1.5;
  padding: 16px;
  border-radius: 10px;
  color: ${theme.palette.text.primary};
  background: transparent;
  border: 1px solid ${theme.palette.divider};
  resize: none;

  &:focus {
    outline: 0;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${theme.palette.primary["100"]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default function AreaInput({
  placeholder,
  value,
  onChange,
  label,
  id,
  required,
  ...props
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
      <Textarea
        aria-label="empty textarea"
        placeholder={placeholder}
        spellCheck={false}
        value={value}
        onChange={onChange}
        {...props}
      />
    </Stack>
  );
}
