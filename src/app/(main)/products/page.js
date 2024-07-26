import React from "react";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { asyncGetList } from "~/utils/httpRequest";
import SidebarFilter from "~/components/common/sidebar-filter/SidebarFilter";
import NavigatePage from "~/components/ui/navigate-page/NavigatePage";
import ListProduct from "./components/ListProduct";

export const metadata = { title: "Sản phẩm" };

async function ProductsPage({ searchParams }) {
  const productGroups = await asyncGetList({
    apiCode: "dmnvt",
    applyToken: true,
    withIdApp: true,
    condition: { page: 1, limit: 99999 },
  });

  return (
    <Box sx={{ width: "100%", backgroundColor: "background.default", py: 2 }}>
      <Container>
        <Box>
          <Grid container spacing={4}>
            <Grid
              md={2.5}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <SidebarFilter groups={productGroups?.data || []} />
            </Grid>
            <Grid xs={12} md={9.5}>
              <Box sx={{ width: "100%" }}>
                <Box mb={1}>
                  <NavigatePage
                    previousURLs={[{ name: "Trang chủ", path: "/" }]}
                    currentPageName="Sản phẩm"
                  />
                </Box>
                <ListProduct
                  defaultCondition={searchParams}
                  groups={productGroups?.data || []}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductsPage;
