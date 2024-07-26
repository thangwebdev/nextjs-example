import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { IoNotifications } from "react-icons/io5";
import MenuHover from "~/components/ui/menu/MenuHover";

function Notification() {
  return (
    <MenuHover
      content={
        <Box
          sx={{
            minWidth: "200px",
            backgroundColor: "background.paper",
            borderRadius: "6px",
          }}
        >
          <Stack spacing={1} alignItems="center" sx={{ py: 1 }}>
            <Typography>Không có thông báo mới</Typography>
          </Stack>
        </Box>
      }
    >
      <IconButton sx={{ color: "common.white" }}>
        <IoNotifications size={20} />
      </IconButton>
    </MenuHover>
  );
}

export default Notification;
