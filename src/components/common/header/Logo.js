import React from "react";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Button
      LinkComponent={Link}
      href="/"
      sx={{
        width: { xs: "140px", md: "200px" },
        height: "45px",
        backgroundColor: "background.paper",
        borderRadius: "50px",
        "&:hover": {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={45}
        priority
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
      />
    </Button>
  );
}

export default Logo;
