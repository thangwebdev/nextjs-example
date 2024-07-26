"use client";
import React, { Suspense, useMemo, useState } from "react";
import { Button, Drawer, Typography } from "@mui/material";
import { FaFilter } from "react-icons/fa6";
import SidebarFilter from "./SidebarFilter";
import { useSearchParams } from "next/navigation";

function SidebarFilterMobileComp({ groups }) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  const currentGroup = useMemo(() => {
    return (groups || []).find((g) => {
      return g._id === searchParams.get("group") || "";
    });
  }, [searchParams, groups]);

  const handleCloseFilter = () => setOpen(false);

  return (
    <>
      <Drawer
        keepMounted
        anchor="left"
        open={open}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: {
            height: "100vh",
            width: "80vw",
            maxWidth: "500px",
            p: 2,
          },
        }}
      >
        <SidebarFilter groups={groups} onCloseFilter={handleCloseFilter} />
      </Drawer>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          height: "42px",
          color: "primary.main",
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "background.paper",
          },
        }}
        startIcon={<FaFilter size={15} />}
      >
        <Typography
          sx={{
            textWrap: "nowrap",
            textTransform: "none",
            maxWidth: "150px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "text.primary",
          }}
        >
          {!!currentGroup ? currentGroup.ten_nvt : "Tất cả"}
        </Typography>
      </Button>
    </>
  );
}

function SidebarFilterMobile({ groups }) {
  return (
    <Suspense>
      <SidebarFilterMobileComp groups={groups} />
    </Suspense>
  );
}

export default SidebarFilterMobile;
