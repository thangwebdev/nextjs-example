import React from "react";
import { Button } from "@mui/material";
import { VscLoading } from "react-icons/vsc";

function LoadingButton({ children, loading, disabled, onClick, ...props }) {
  return (
    <Button
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
      endIcon={
        loading ? <VscLoading size={16} className="round-loading" /> : undefined
      }
    >
      {children}
    </Button>
  );
}

export default LoadingButton;
