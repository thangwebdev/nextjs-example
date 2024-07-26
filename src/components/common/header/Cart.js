"use client";
import React from "react";
import { Badge, Button, Typography } from "@mui/material";
import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useAppContext } from "~/contexts/ContextProvider";

function Cart() {
  const { cart } = useAppContext();

  return (
    <Button
      LinkComponent={Link}
      href="/cart"
      variant="contained"
      sx={{
        color: "common.white",
        height: "42px",
        textTransform: "none",
        backgroundColor: "#ffffff55",
        borderRadius: "20px",
        "&:hover": {
          backgroundColor: "#ffffff55",
        },
      }}
      startIcon={
        <Badge badgeContent={cart?.length || 0} color="error">
          <MdShoppingCart size={20} />
        </Badge>
      }
    >
      <Typography
        sx={{
          display: { xs: "none", md: "block" },
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Giỏ hàng
      </Typography>
    </Button>
  );
}

export default Cart;
