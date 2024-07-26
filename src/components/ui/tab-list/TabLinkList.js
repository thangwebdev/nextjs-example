"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Box, Tab, Tabs } from "@mui/material";

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component={Link}
      sx={{
        borderRadius: "10px",
        px: 2,
        py: 0.5,
        minHeight: "42px",
        textTransform: "none",
        fontSize: "16px",
      }}
      {...props}
    />
  );
}

export default function TabLinkList({
  tabs = [{ label: "", href: "/" }],
  defaultValue = 0,
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event, newValue) => {
    if (
      event.type !== "click" ||
      (event.type === "click" && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav link tab"
        role="navigation"
        sx={{ minHeight: "42px" }}
        scrollButtons={true}
        variant="scrollable"
        allowScrollButtonsMobile
        TabScrollButtonProps={{
          sx: { "&.Mui-disabled": { display: "none" } },
        }}
      >
        {tabs.map((tab) => {
          return (
            <LinkTab
              key={tab.href}
              label={tab.label}
              href={tab.href}
              value={tab.value}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
