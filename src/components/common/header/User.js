"use client";
import React from "react";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import MenuHover from "~/components/ui/menu/MenuHover";
import { MdAccountCircle } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { logoutUser } from "~/actions/auth.action";
import { useAppContext } from "~/contexts/ContextProvider";
import useConfirm from "~/hooks/useConfirm";
import { handleLogout } from "~/app/actions";

const items = [
  {
    icon: MdAccountCircle,
    text: "Thông tin tài khoản",
    href: "/account",
  },
  {
    icon: FaHistory,
    text: "Đơn hàng của tôi",
    href: "/myorder",
  },
];

function User() {
  const { profile } = useAppContext();
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
    <MenuHover
      content={
        <Box
          sx={{
            minWidth: "200px",
            minHeight: "100px",
            backgroundColor: "background.paper",
            borderRadius: "6px",
          }}
        >
          <List>
            {items.map((item) => (
              <ListItemButton
                key={item.text}
                LinkComponent={Link}
                href={item.href}
              >
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <item.icon size={16} />
                </ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItemButton>
            ))}
            <ListItemButton onClick={logout}>
              <ListItemIcon sx={{ minWidth: "30px", color: "error.main" }}>
                <FiLogOut size={16} />
              </ListItemIcon>
              <ListItemText sx={{ color: "error.main" }}>
                Đăng xuất
              </ListItemText>
            </ListItemButton>
          </List>
        </Box>
      }
    >
      <Button
        sx={{
          color: "common.white",
          height: "42px",
          maxWidth: "150px",
          textTransform: "none",
        }}
        startIcon={
          <Image src="/user.png" alt="User image" width={30} height={30} />
        }
        endIcon={<FaAngleDown size={14} />}
      >
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {profile?.name}
        </Typography>
      </Button>
    </MenuHover>
  );
}

export default User;
