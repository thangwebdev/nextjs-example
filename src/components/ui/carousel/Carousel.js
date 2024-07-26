"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Box } from "@mui/material";

function Carousel({
  itemHeight = "",
  spaceBetween = 0,
  slidesPerView = 1,
  items = [],
  wrapperProps = {},
  loop,
  autoplay,
  pagination = true,
  breakpoints = {},
  ...props
}) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        color: "primary.main",
        userSelect: "none",
      }}
      {...wrapperProps}
    >
      {/* Main slide */}
      <Swiper
        spaceBetween={Number(spaceBetween)}
        slidesPerView={Number(slidesPerView)}
        breakpoints={breakpoints}
        pagination={
          !!pagination
            ? {
                clickable: true,
                bulletClass: `carousel-pagination-bullet`,
                bulletActiveClass: "carousel-pagination-bullet-active",
              }
            : false
        }
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        loop={!!items && items.length >= 2 && loop ? loop : false}
        style={{ color: "currentColor" }}
        autoplay={
          !!autoplay
            ? {
                pauseOnMouseEnter: true,
              }
            : false
        }
        {...props}
      >
        {!!items && items.length > 0 ? (
          <>
            {items.map((comp, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    width: "100%",
                    height: !!itemHeight ? `${itemHeight}` : "100%",
                    overflow: "hidden",
                  }}
                >
                  {comp}
                </Box>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: !!itemHeight ? `${itemHeight}` : "200px",
              backgroundColor: "divider",
            }}
          ></Box>
        )}
      </Swiper>
    </Box>
  );
}

export default Carousel;
