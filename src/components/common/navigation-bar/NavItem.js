"use client";
import React from "react";
import { Button, List, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import MenuHover from "~/components/ui/menu/MenuHover";

function NavItem({ children, href = "/", subs }) {
  const pathname = usePathname();
  const active = pathname.includes(href);

  return (
    <MenuHover
      content={
        subs?.length > 0 ? (
          <List
            sx={{
              backgroundColor: "background.paper",
              minWidth: "200px",
              borderRadius: "10px",
            }}
          >
            {subs.map((sub) => {
              return (
                <ListItemButton
                  key={sub.href}
                  LinkComponent={Link}
                  sx={{ px: 1, py: 0.5 }}
                >
                  <ListItemText>{sub.name}</ListItemText>
                </ListItemButton>
              );
            })}
          </List>
        ) : null
      }
    >
      <Button
        LinkComponent={Link}
        href={href}
        sx={{
          height: "35px",
          color: active ? "primary.main" : "text.primary",
          fontWeight: 600,
        }}
        endIcon={subs?.length > 0 ? <IoIosArrowDown size={14} /> : null}
      >
        {children}
      </Button>
    </MenuHover>
  );
}

export default NavItem;
