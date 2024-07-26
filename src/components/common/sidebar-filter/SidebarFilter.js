import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Groups from "./components/Groups";

function SidebarFilter({ groups, onCloseFilter }) {
  return (
    <Stack sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h5">Nhóm hàng hóa</Typography>
      </Stack>
      <Box
        className="hidden-scroll"
        sx={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <Groups groups={groups} onCloseFilter={onCloseFilter} />
      </Box>
    </Stack>
  );
}

export default SidebarFilter;
