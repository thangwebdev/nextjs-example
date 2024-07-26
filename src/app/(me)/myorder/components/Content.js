"use client";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Orders from "./Orders";
import Link from "next/link";
import TabLinkList from "~/components/ui/tab-list/TabLinkList";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncGetList } from "~/utils/httpRequest";
import { useSearchParams } from "next/navigation";
import Pagiation from "~/components/ui/pagination/Pagination";

const rowPerPage = 10;
function Content() {
  const { token, customer, showAlert, setShowBackdrop } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [countAll, setCountAll] = useState(0);
  const [count, setCount] = useState(0);
  const [tabs, setTabs] = useState([]);

  const getTrangThais = async () => {
    try {
      setShowBackdrop(true);
      const resp = await asyncGetList({
        apiCode: "trangthai",
        withIdApp: false,
        condition: { page: 1, limit: 99999, q: { ma_ct: "PBL_PHARMA" } },
      });
      if (resp.status === 200) {
        const listTab = [];
        for (let i = 0; i < (resp.data || []).length; i++) {
          const item = resp.data[i];
          const respCount = await asyncGetList({
            apiCode: "pbl_pharma",
            token,
            condition: {
              count: 1,
              q: {
                trang_thai: item.ma_trang_thai,
                ma_kh: customer.ma_kh,
                status: true,
              },
            },
          });
          if (respCount.status === 200) {
            const number = Number(respCount.data?.rows_number || 0);
            listTab.push({
              label: `${item.ten_trang_thai}${
                number > 0 ? ` (${number})` : ""
              }`,
              href: `/myorder?status=${item.ma_trang_thai}`,
              value: Number(item.ma_trang_thai),
            });
          }
        }
        setTabs(listTab);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message ||
            resp.data.error ||
            "Lỗi khi tải trạng thái đơn hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  const getCount = async () => {
    try {
      setShowBackdrop(true);
      const resp = await asyncGetList({
        apiCode: "pbl_pharma",
        token,
        condition: { count: 1, q: { status: true } },
      });
      if (resp.status === 200) {
        setCountAll(resp.data.rows_number);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message ||
            resp.data.error ||
            "Lỗi khi tải thông tin đơn hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  const getOrders = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const status = searchParams.get("status");
      const q = {
        status: true,
        ma_kh: customer.ma_kh,
        trang_thai: status || 0,
      };
      const resp = await asyncGetList({
        apiCode: "pbl_pharma",
        token,
        condition: {
          page,
          limit: rowPerPage,
          q,
        },
      });

      const respCount = await asyncGetList({
        apiCode: "pbl_pharma",
        token,
        condition: {
          count: 1,
          q,
        },
      });
      if (resp.status === 200 && respCount.status === 200) {
        setOrders(resp.data);
        setCount(respCount.data.rows_number);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message ||
            resp.data.error ||
            "Lỗi khi tải thông tin đơn hàng",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customer?.ma_kh) {
      getOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.ma_kh, searchParams, page]);

  useEffect(() => {
    if (customer?.ma_kh) {
      getCount();
      getTrangThais();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.ma_kh]);

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        borderRadius: "10px",
        backgroundColor: "background.paper",
      }}
    >
      <Stack direction="row" alignItems="center" mb={2} gap={1}>
        <Image src="/order_history.png" alt="Profile" width={30} height={30} />
        <Typography variant="h5">Lịch sử đơn hàng</Typography>
      </Stack>
      {(countAll || 0) <= 0 ? (
        <Stack>
          <Typography variant="h6" textAlign="center">
            Bạn chưa có đơn hàng nào
          </Typography>
          <Typography textAlign="center">
            Cùng{" "}
            <Typography
              component={Link}
              href="/cart"
              sx={{ color: "secondary.main" }}
            >
              đặt đơn hàng
            </Typography>{" "}
            đầu tiên cho mình nhé
          </Typography>
        </Stack>
      ) : (
        <>
          <TabLinkList
            tabs={tabs || []}
            defaultValue={Number(searchParams.get("status") || 0)}
          />
          <Orders orders={orders} loading={loading} />
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ display: orders?.length > 0 ? "flex" : "none", pt: 2 }}
          >
            <Pagiation
              currentPage={page}
              hideNextButton={true}
              hidePrevButton={true}
              rowsPerPage={rowPerPage}
              rowCount={count}
              onChangePage={setPage}
            />
          </Stack>
        </>
      )}
    </Box>
  );
}

export default Content;
