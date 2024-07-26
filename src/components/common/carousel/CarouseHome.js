import React from "react";
import { Box } from "@mui/material";
import { asyncGetList } from "~/utils/httpRequest";
import Image from "next/image";
import { generateLinkImage } from "~/utils/helpers";
import Carousel from "~/components/ui/carousel/Carousel";

async function CarouseHome() {
  const slideResponse = await asyncGetList({
    apiCode: "home.slideshow",
    condition: { page: 1, limit: 9999 },
  });

  const images = (slideResponse.data || []).reduce((acc, item) => {
    if (item.picture1) {
      acc.push(item.picture1);
    }
    if (item.picture2) {
      acc.push(item.picture2);
    }
    if (item.picture3) {
      acc.push(item.picture3);
    }
    return acc;
  }, []);

  return (
    <Box>
      <Carousel
        slidesPerView={1}
        autoplay
        loop
        items={(images || []).map((image) => {
          return (
            <Box
              key={image}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            >
              <Image
                src={generateLinkImage(image)}
                alt="Slide iamge"
                width={1250}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </Box>
          );
        })}
      />
      {/* <Grid container spacing={2}>
        <Grid xs={12} md={7}>
          <Carousel
            slidesPerView={1}
            autoplay
            loop
            items={(images || []).map((image) => {
              return (
                <Box
                  key={image}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    src={generateLinkImage(image)}
                    alt="Slide iamge"
                    width={1250}
                    height={400}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              );
            })}
          />
        </Grid>
        <Grid xs={12} md={5}>
          <Box>
            <Grid container spacing={1}>
              <Grid xs={6}>
                <Image
                  src="/banner1.webp"
                  alt="Slide iamge"
                  width={600}
                  height={400}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                />
              </Grid>
              <Grid xs={6}>
                <Image
                  src={generateLinkImage(images[2])}
                  alt="Slide iamge"
                  width={600}
                  height={400}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <Image
                  src="/banner2.webp"
                  alt="Slide iamge"
                  width={600}
                  height={400}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid> */}
    </Box>
  );
}

export default CarouseHome;
