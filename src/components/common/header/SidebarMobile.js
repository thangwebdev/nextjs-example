"use client";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { LuMenu } from "react-icons/lu";
import { useAppContext } from "~/contexts/ContextProvider";
import Image from "next/image";
import LogoutButton from "~/components/ui/button/LogoutButton";
import { NAVBARS } from "~/utils/ui-constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const topHeight = "80px";
const bottomHeight = "45px";

function SidebarMobile() {
  const pathname = usePathname();
  const { token, profile } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  if (!token) return null;

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "80vw", maxWidth: "600px", height: "100vh" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "background.paper",
          }}
        >
          {/* Top */}
          <ListItemButton
            LinkComponent={Link}
            href="/account"
            onClick={handleClose}
            sx={{
              height: topHeight,
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.main" },
            }}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <Image src="/user.png" alt="user iamge" width={50} height={50} />
              <Stack>
                <Typography variant="h6" sx={{ color: "common.white" }}>
                  {profile?.name}
                </Typography>
                <Typography sx={{ color: "common.white" }}>
                  {profile?.email}
                </Typography>
              </Stack>
            </Stack>
          </ListItemButton>
          {/* Middle */}
          <Box
            sx={{
              height: `calc(100vh - ${topHeight} - ${bottomHeight})`,
              overflow: "auto",
            }}
          >
            <List>
              {NAVBARS.map((nav) => {
                const active = pathname.includes(nav.href);
                return (
                  <ListItemButton
                    key={nav.name}
                    LinkComponent={Link}
                    href={nav.href}
                    onClick={handleClose}
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: active ? "primary.100" : "",
                    }}
                  >
                    <ListItemText>{nav.name}</ListItemText>
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
          {/* Bottom */}
          <Stack sx={{ height: bottomHeight }}>
            <LogoutButton sx={{ borderRadius: "0px", fontWeight: "600" }}>
              Đăng xuất
            </LogoutButton>
          </Stack>
        </Box>
      </Drawer>
      <IconButton
        sx={{ color: "common.white", width: "45px", height: "45px" }}
        onClick={() => setOpen(true)}
      >
        <LuMenu size={25} />
      </IconButton>
    </>
  );
}

export default SidebarMobile;
