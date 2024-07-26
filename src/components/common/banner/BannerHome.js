import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";

function BannerHome() {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={6}>
        <Image
          src="/banner1.webp"
          alt="banner 1"
          width={600}
          height={200}
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <Image
          src="/banner2.webp"
          alt="banner 2"
          width={600}
          height={200}
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </Grid>
    </Grid>
  );
}

export default BannerHome;
