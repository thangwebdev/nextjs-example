"use client";
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHistory, FaUserAlt } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbLogout2, TbTruckDelivery } from "react-icons/tb";
import { handleLogout } from "~/app/actions";
import useConfirm from "~/hooks/useConfirm";

const items = [
  {
    name: "Thông tin tài khoản",
    href: "/account",
    icon: FaUserAlt,
  },
  {
    name: "Lịch sử đơn hàng",
    href: "/myorder",
    icon: FaHistory,
  },
  {
    name: "Mã giảm giá",
    href: "/mydiscount",
    icon: RiDiscountPercentFill,
  },
  {
    name: "Thông tin giao hàng",
    href: "/mydelivery",
    icon: TbTruckDelivery,
  },
];

function Sidebar() {
  const pathname = usePathname();
  const { showConfirm } = useConfirm();

  const allowLogout = async () => {
    await handleLogout();
    window.location.reload();
  };

  const logout = () => {
    showConfirm({
      title: "Đăng xuất",
      width: "400px",
      message: "Bạn có chắc muốn đăng xuất không ?",
      onConfirm: allowLogout,
    });
  };

  return (
    <>
      <Box sx={{ borderRadius: "10px", backgroundColor: "background.paper" }}>
        <List>
          {items.map((item) => {
            const active = pathname.includes(item.href);
            return (
              <ListItemButton
                key={item.name}
                LinkComponent={Link}
                href={item.href}
                sx={{
                  px: 2,
                  py: 1,
                  color: active ? "primary.main" : "text.primary",
                  borderBottom: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "35px",
                    color: active ? "primary.main" : "text.secondary",
                  }}
                >
                  <item.icon size={20} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: active ? "600" : "500",
                    },
                  }}
                >
                  {item.name}
                </ListItemText>
              </ListItemButton>
            );
          })}
          <ListItemButton
            onClick={logout}
            sx={{
              px: 2,
              py: 0.5,
              color: "error.main",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "35px",
                color: "error.main",
              }}
            >
              <TbLogout2 size={20} />
            </ListItemIcon>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  fontWeight: 500,
                },
              }}
            >
              Đăng xuất
            </ListItemText>
          </ListItemButton>
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
