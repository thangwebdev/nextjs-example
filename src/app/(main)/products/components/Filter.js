"use client";
import React, { Suspense, useMemo, useState } from "react";
import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import { HiOutlineSelector } from "react-icons/hi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PRODUCT_MODES } from "~/utils/ui-constants";

function FilterComp() {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const currentOption = useMemo(() => {
    return PRODUCT_MODES.find(
      (item) => item.filter === Number(searchParams.get("filter") || 0)
    );
  }, [searchParams]);

  const handleSelect = (selectedMode) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("filter", selectedMode?.filter || 0);
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
    handleCloseMenu();
  };

  return (
    <>
      <Menu anchorEl={anchorMenu} open={!!anchorMenu} onClose={handleCloseMenu}>
        <List
          sx={{ backgroundColor: "background.paper", borderRadius: "10px" }}
        >
          {PRODUCT_MODES.map((mode) => {
            const active = currentOption?.filter === mode.filter;
            return (
              <ListItemButton key={mode.id} onClick={() => handleSelect(mode)}>
                <ListItemText sx={{ color: active ? "primary.main" : "" }}>
                  {mode.name}
                </ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </Menu>
      <Button
        variant="text"
        onClick={(e) => setAnchorMenu(e.currentTarget)}
        sx={{
          height: "35px",
          textTransform: "none",
          color: "text.primary",
          backgroundColor: "background.paper",

          "&:hover": {
            backgroundColor: "background.paper",
          },
        }}
        endIcon={<HiOutlineSelector size={16} />}
      >
        <Typography
          sx={{
            textWrap: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {currentOption?.name}
        </Typography>
      </Button>
    </>
  );

  // return (
  //   <MenuHover
  //     content={
  //       <List
  //         sx={{ backgroundColor: "background.paper", borderRadius: "10px" }}
  //       >
  //         {PRODUCT_MODES.map((mode) => {
  //           const active = currentOption?.filter === mode.filter;
  //           return (
  //             <ListItemButton key={mode.id} onClick={() => handleSelect(mode)}>
  //               <ListItemText sx={{ color: active ? "primary.main" : "" }}>
  //                 {mode.name}
  //               </ListItemText>
  //             </ListItemButton>
  //           );
  //         })}
  //       </List>
  //     }
  //   >
  //     <Button
  //       variant="text"
  //       sx={{
  //         height: "35px",
  //         textTransform: "none",
  //         color: "text.primary",
  //         backgroundColor: "background.paper",

  //         "&:hover": {
  //           backgroundColor: "background.paper",
  //         },
  //       }}
  //       endIcon={<HiOutlineSelector size={16} />}
  //     >
  //       <Typography
  //         sx={{
  //           textWrap: "nowrap",
  //           textOverflow: "ellipsis",
  //           overflow: "hidden",
  //         }}
  //       >
  //         {currentOption?.name}
  //       </Typography>
  //     </Button>
  //   </MenuHover>
  // );
}

function Filter() {
  return (
    <Suspense>
      <FilterComp />
    </Suspense>
  );
}
export default Filter;