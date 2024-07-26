import { Box, Container } from "@mui/material";
import BannerHome from "~/components/common/banner/BannerHome";
import CarouseHome from "~/components/common/carousel/CarouseHome";
import CarouselProduct from "~/components/common/carousel/CarouselProduct";
import Commit from "~/components/common/commit/Commit";
import Introduce from "~/components/common/introduce/Introduce";

export const metadata = { title: "Trang chủ" };

export default function Home() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "background.default", py: 2 }}>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
          <CarouseHome />
          <Commit />
          <CarouselProduct
            image="/bestseller.png"
            title="Sản phẩm bán chạy"
            conditionField="bestseller"
            filter={1}
            wrapperSx={{
              backgroundColor: "primary.main",
              p: 1,
              borderRadius: "10px",
            }}
            titleSx={{ color: "common.white" }}
            showMore
            showMoreSx={{ color: "common.white" }}
          />
          <CarouselProduct
            image="/hot.png"
            title="Sản phẩm HOT"
            conditionField="hot"
            titleSx={{
              color: "text.primary",
              "&:hover": {
                color: "warning.main",
                transition: "all linear 0.1s",
              },
            }}
            filter={2}
          />
          <BannerHome />
          <CarouselProduct
            image="/outstanding.png"
            title="Hàng nổi"
            conditionField="banner_small"
            titleSx={{
              color: "text.primary",
              "&:hover": {
                color: "error.main",
                transition: "all linear 0.1s",
              },
            }}
            filter={3}
          />
          <Introduce />
        </Box>
      </Container>
    </Box>
  );
}
