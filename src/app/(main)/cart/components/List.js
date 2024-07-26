"use client";
import React, { useMemo } from "react";
import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { useAppContext } from "~/contexts/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import { addOrUpdateItemCart, deleteItemCart } from "~/actions/cart.action";
import useConfirm from "~/hooks/useConfirm";

function List() {
  const { cart, token, showAlert, initCart, setShowBackdrop } = useAppContext();
  const { showConfirm } = useConfirm();

  const handleAllCheckChange = async (e) => {
    try {
      setShowBackdrop(true);
      const checked = e.target.checked;
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        if (item.status !== checked) {
          const resp = await addOrUpdateItemCart({
            type: "update",
            token,
            cartItem: { ...item, status: checked },
          });
          if (resp.status !== 200) {
            showAlert({
              title: "Vui lòng thử lại",
              width: "400px",
              type: "error",
              message:
                resp.data.message ||
                resp.data.error ||
                "Lỗi khi cập nhật giỏ hàng",
            });
            break;
          }
        }
      }
    } finally {
      await initCart();
      setShowBackdrop(false);
    }
  };

  const handleDelete = async () => {
    try {
      setShowBackdrop(true);
      for (let i = 0; i < activedItemCarts.length; i++) {
        const item = activedItemCarts[i];
        const resp = await deleteItemCart({ id: item._id, token });
        if (resp.status !== 200) {
          showAlert({
            title: "Vui lòng thử lại",
            width: "400px",
            type: "error",
            message:
              resp.data.message ||
              resp.data.error ||
              "Lỗi khi cập nhật giỏ hàng",
          });
          break;
        }
      }
    } finally {
      await initCart();
      setShowBackdrop(false);
    }
  };

  const activedItemCarts = useMemo(() => {
    return (cart || []).filter((item) => item.status);
  }, [cart]);

  if (!cart || cart.length < 1) {
    return (
      <Stack
        alignItems="center"
        gap={1}
        sx={{ p: 2, backgroundColor: "background.paper", borderRadius: "10px" }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Bạn chưa có sản phẩm nào trong giỏ
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          Cùng{" "}
          <Typography
            component={Link}
            href="/products"
            sx={{ color: "secondary.main" }}
          >
            xem sản phẩm
          </Typography>{" "}
          và lấp đầy giỏ hàng nào
        </Typography>
        <Image
          src="/cart_empty.png"
          alt="empty cart"
          width={150}
          height={150}
        />
      </Stack>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "10px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            py: 1,
            borderBottom: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5">Giỏ hàng ({cart?.length || 0})</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            {activedItemCarts?.length > 0 && (
              <Button
                color="error"
                sx={{ height: "42px" }}
                onClick={() => {
                  showConfirm({
                    title: "Xác nhận",
                    width: "400px",
                    message: `Bạn có chắc muốn xóa ${
                      activedItemCarts.length || 0
                    } sản phẩm đã chọn không ?`,
                    onConfirm: handleDelete,
                  });
                }}
              >
                Xóa {activedItemCarts.length} mục chọn
              </Button>
            )}
            <Checkbox
              checked={activedItemCarts?.length === cart?.length}
              onChange={handleAllCheckChange}
            />
          </Stack>
        </Stack>
        <Box
          sx={{
            py: 1,
            maxHeight: "calc(100vh - 60px)",
            overflow: "auto",
          }}
        >
          {(cart || []).map((item) => {
            return <CartItem key={item._id} data={item} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default List;
