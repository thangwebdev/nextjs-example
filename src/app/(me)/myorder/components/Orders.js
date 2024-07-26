import React from "react";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import OrderItem from "./OrderItem";

function Orders({ orders = [], loading }) {
  const renderLoading = () => {
    return (
      <Stack gap={2}>
        {new Array(2).fill(0).map((_, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack sx={{ width: "20%" }}>
              <Skeleton variant="text" animation="wave" sx={{ width: "60%" }} />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ width: "100%" }}
              />
            </Stack>
            <Stack sx={{ width: "35%" }}>
              <Skeleton variant="text" animation="wave" sx={{ width: "60%" }} />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ width: "100%" }}
              />
            </Stack>
            <Stack sx={{ width: "10%" }}>
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ width: "100%", height: "40px" }}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    );
  };

  return (
    <Box sx={{ py: 1, height: "60vh", overflow: "auto" }}>
      <Stack gap={1}>
        {loading ? (
          renderLoading()
        ) : (
          <>
            {orders?.length > 0 ? (
              orders.map((order) => {
                return <OrderItem key={order._id} order={order} />;
              })
            ) : (
              <Typography sx={{ textAlign: "center", py: 2 }}>
                Không có đơn hàng nào ở trạng thái này
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}

export default Orders;
