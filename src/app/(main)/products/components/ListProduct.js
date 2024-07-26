"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Product from "~/components/common/product/Product";
import { asyncGetList } from "~/utils/httpRequest";
import { useSearchParams } from "next/navigation";
import ListActions from "./ListActions";
import { LIMIT, PRODUCT_MODES } from "~/utils/ui-constants";
import Empty from "./Empty";

function ListProductComp({
  defaultCondition = {
    keyword: "",
    page: 1,
    group: "",
    sort: 0,
    filter: 0,
  },
  groups = [],
}) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState(defaultCondition);
  const searchParams = useSearchParams();

  const getProducts = async () => {
    try {
      setLoading(true);
      let query = {};
      if (condition?.group) {
        query.ma_nvt = condition.group;
      }
      if (condition?.keyword) {
        query.$or = [
          {
            ma_vt: {
              $regex: condition.keyword.split(" ").join(".*"),
              $options: "i",
            },
          },
          {
            ten_vt: {
              $regex: condition.keyword.split(" ").join(".*"),
              $options: "i",
            },
          },
        ];
      }
      if (condition?.filter) {
        const currentFilter = PRODUCT_MODES.find(
          (item) => item.filter === Number(condition.filter)
        );
        query = { ...query, ...(currentFilter?.query || {}) };
      }
      const resp = await asyncGetList({
        apiCode: "dmvt",
        condition: {
          limit: LIMIT,
          page: Number(condition?.page || 1),
          q: query,
        },
      });
      const respCount = await asyncGetList({
        apiCode: "dmvt",
        condition: {
          limit: 20,
          page: Number(condition?.page || 1),
          count: 1,
          q: query,
        },
      });
      if (resp.status === 200) {
        const result = [];
        for (let i = 0; i < resp.data.length; i++) {
          const currentProduct = resp.data[i];
          result.push({ ...currentProduct });
          const respDvts = await asyncGetList({
            apiCode: "dmqddvt",
            condition: {
              page: 1,
              limit: 9999,
              q: {
                ma_vt: currentProduct.ma_vt,
                ma_dvt: { $ne: currentProduct.ma_dvt },
              },
            },
          });
          if (respDvts.status === 200) {
            respDvts.data.forEach((dvt) => {
              result.push({
                ...currentProduct,
                gia_ban_le: dvt.gia_ban_nt || 0,
                ma_dvt: dvt?.ma_dvt || "",
                ten_dvt: dvt?.ten_dvt || "",
              });
            });
          }
        }
        setProducts(result);
      }
      if (respCount.status === 200) {
        setCount(respCount.data?.rows_number || 0);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const renderLoading = () => {
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          {new Array(12).fill(0).map((_, index) => {
            return (
              <Grid key={index} xs={6} sm={4} md={3}>
                <Stack sx={{ width: "100%" }}>
                  <Skeleton
                    sx={{ width: "100%", height: "200px" }}
                    variant="rounded"
                    animation="wave"
                  />
                  <Skeleton
                    sx={{ width: "60%", height: "20px" }}
                    variant="text"
                    animation="wave"
                  />
                  <Skeleton
                    sx={{ width: "100%", height: "20px" }}
                    variant="text"
                    animation="wave"
                  />
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  useEffect(() => {
    setCondition({
      keyword: searchParams.get("keyword") || "",
      page: searchParams.get("page") || 1,
      group: searchParams.get("group") || "",
      filter: searchParams.get("filter") || 0,
    });
  }, [searchParams]);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <ListActions
          groups={groups}
          rowCount={count}
          wrapperPaginationSx={{
            display: {
              xs: "none",
              md: `${!products || products.length <= 0 ? "none" : "block"}`,
            },
          }}
        />
      </Box>
      {loading ? (
        renderLoading()
      ) : (
        <>
          {!products || products.length <= 0 ? (
            <Empty groups={groups} />
          ) : (
            <Grid container spacing={{ xs: 1, md: 2 }}>
              {products.map((product) => {
                return (
                  <Grid
                    key={`${product._id}_${product.ma_dvt}`}
                    xs={6}
                    sm={4}
                    md={3}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        color: "primary.300",
                        "&:hover": {
                          boxShadow: "0px 0px 2px 1px currentColor",
                        },
                      }}
                    >
                      <Product data={product} />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </>
      )}
      <Box sx={{ mt: 2, display: { xs: "block", sm: "none" } }}>
        <ListActions
          rowCount={count}
          hideSort
          hideNextButton={false}
          hidePrevButton={false}
          wrapperSidebarSx={{ display: "none" }}
          wrapperPaginationSx={{
            display: {
              sm: "none",
              xs: `${!products || products.length <= 0 ? "none" : "block"}`,
            },
          }}
        />
      </Box>
      <Box sx={{ mt: 2, display: { xs: "none", sm: "block" } }}>
        <ListActions
          rowCount={count}
          hideSort
          wrapperSidebarSx={{ display: "none" }}
          wrapperPaginationSx={{
            display: {
              xs: "none",
              sm: `${!products || products.length <= 0 ? "none" : "block"}`,
            },
          }}
        />
      </Box>
    </Box>
  );
}

function ListProduct({
  defaultCondition = {
    keyword: "",
    page: 1,
    group: "",
    sort: 0,
    filter: 0,
  },
  groups = [],
}) {
  return (
    <Suspense>
      <ListProductComp defaultCondition={defaultCondition} groups={groups} />
    </Suspense>
  );
}
export default ListProduct;
