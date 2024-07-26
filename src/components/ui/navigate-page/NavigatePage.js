"use client";
import React from "react";
import { Breadcrumbs, Link as MUILink, Typography } from "@mui/material";
import Link from "next/link";

function NavigatePage({
  previousURLs = [{ path: "/", name: "Home" }],
  currentPageName = "products",
}) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {previousURLs.map((url) => (
        <MUILink
          key={url.path}
          component={Link}
          underline="hover"
          color="inherit"
          href={url.path}
          sx={{ fontWeight: 500 }}
        >
          {url.name}
        </MUILink>
      ))}
      <Typography color="primary" sx={{ fontWeight: 500 }}>
        {currentPageName}
      </Typography>
    </Breadcrumbs>
  );
}

export default NavigatePage;
