"use client";
import React, { useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { BsInfoCircle } from "react-icons/bs";
import { formatDateDisplay, numeralCustom } from "~/utils/helpers";
import DialogBase from "~/components/ui/dialog/DialogBase";
import Image from "next/image";
import { useAppContext } from "~/contexts/ContextProvider";
import { cloneDeep } from "lodash";
import { updateCustomer } from "~/actions/customer.action";
import { toast } from "react-toastify";

function Discount({ data, tienHang = 0 }) {
  const { token, customer, showAlert, initCustomer } = useAppContext();
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const handleSelectDiscount = async () => {
    if (!customer) return;
    const customerClone = cloneDeep(customer);
    if (isSelected) {
      customerClone.exfields.dmchietkhau = null;
    } else {
      customerClone.exfields.dmchietkhau = data;
    }
    const resp = await updateCustomer({
      id: customerClone._id,
      token,
      data: customerClone,
    });
    if (resp.status === 200) {
      await initCustomer();
      toast(
        isSelected
          ? `Đã BỎ áp dụng mã giảm '${data.ten_chietkhau}'`
          : `Đã áp dụng mã giảm '${data.ten_chietkhau}'`,
        {
          type: isSelected ? "error" : "success",
        }
      );
    } else {
      showAlert({
        title: "Vui lòng thử lại",
        width: "400px",
        type: "error",
        message:
          resp.data.message || resp.data.error || "Lỗi khi áp dụng mã giảm giá",
      });
    }
  };

  const isSelected = useMemo(() => {
    if (!customer?.exfields?.dmchietkhau) {
      return false;
    } else {
      if (customer?.exfields?.dmchietkhau?._id === data?._id) {
        return true;
      } else {
        return false;
      }
    }
  }, [data, customer?.exfields?.dmchietkhau]);

  const isReach = useMemo(() => {
    if ((data?.gt_hd_tu || 0) <= tienHang) {
      return true;
    } else {
      return false;
    }
  }, [data, tienHang]);

  return (
    <>
      <DialogBase
        title="Điều kiện áp dụng"
        width="500px"
        open={openModal}
        onClose={handleCloseModal}
        content={
          <Box
            sx={{
              maxHeight: "calc(90vh - 20px - 39px - 39px)",
              overflow: "auto",
              gap: 0.5,
              pr: 0.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack direction="row" justifyContent="center" sx={{ mb: 1 }}>
              <Image
                src="/discount.svg"
                width={100}
                height={80}
                alt="Discount icon"
              />
            </Stack>
            {data?.ma_kh && (
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "background.default",
                }}
              >
                <Typography
                  sx={{
                    width: "40%",
                    textAlign: "center",
                    fontWeight: 600,
                    padding: "8px 0",
                  }}
                >
                  Khách hàng
                </Typography>
                <Typography
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    padding: "8px 0",
                  }}
                >
                  {data?.ten_kh}
                </Typography>
              </Stack>
            )}
            {data?.nh_kh && (
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "background.default",
                }}
              >
                <Typography
                  sx={{
                    width: "40%",
                    textAlign: "center",
                    fontWeight: 600,
                    padding: "8px 0",
                  }}
                >
                  Nhóm khách
                </Typography>
                <Typography
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    padding: "8px 0",
                  }}
                >
                  {data?.ten_nh_kh}
                </Typography>
              </Stack>
            )}
            {(Number(data?.gt_hd_tu || 0) > 0 ||
              Number(data?.gt_hd_den || 0) > 0) && (
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "background.default",
                }}
              >
                <Typography
                  sx={{
                    width: "40%",
                    textAlign: "center",
                    fontWeight: 600,
                    padding: "8px 0",
                  }}
                >
                  Giá trị hóa đơn
                </Typography>
                <Typography
                  sx={{
                    width: "60%",
                    textAlign: "center",
                    padding: "8px 0",
                    fontWeight: 600,
                  }}
                >
                  <Typography component="span">Từ</Typography>{" "}
                  <Typography
                    component="span"
                    sx={{ color: "error.main", fontWeight: 600 }}
                  >
                    {numeralCustom(data?.gt_hd_tu).format()}đ
                  </Typography>{" "}
                  {Number(data?.gt_hd_den) > 0 && (
                    <>
                      <Typography component="span">Đến</Typography>{" "}
                      <Typography
                        component="span"
                        sx={{ color: "error.main", fontWeight: 600 }}
                      >
                        {numeralCustom(gt_hd_den).format()}đ
                      </Typography>
                    </>
                  )}
                </Typography>
              </Stack>
            )}
          </Box>
        }
        actions={[
          <Stack
            key={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mt: 1 }}
          >
            <Button
              variant="contained"
              sx={{ color: "common.white" }}
              onClick={handleCloseModal}
            >
              Đã hiểu
            </Button>
          </Stack>,
        ]}
      />
      {/* Item */}
      <Box
        sx={{
          borderRadius: "6px",
          border: "1px dashed",
          borderColor: "#ddd",
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-start"
          sx={{
            padding: "10px",
            borderBottom: "1px dashed",
            borderColor: "#ddd",
          }}
        >
          <Stack alignItems="flex-start" sx={{ flex: 1 }}>
            {!data?.ty_le_ck ? (
              <Typography
                sx={{
                  textTransform: "uppercase",
                  color: "error.main",
                  fontSize: "16px",
                  fontWeight: 600,
                  textWrap: true,
                }}
              >
                Giảm {numeralCustom(data?.tien_ck).format()}
              </Typography>
            ) : (
              <Typography
                sx={{
                  textTransform: "uppercase",
                  color: "error.main",
                  fontSize: "16px",
                  fontWeight: 600,
                  textWrap: true,
                }}
              >
                Giảm {data?.ty_le_ck}%{" "}
                {data?.tien_ck
                  ? `, tối đa ${numeralCustom(data?.tien_ck).format()}`
                  : null}
              </Typography>
            )}
            <Typography
              sx={{
                textWrap: true,
              }}
            >
              <Typography component="span" sx={{ fontWeight: 600 }}>
                {data?.ma_chietkhau}
              </Typography>{" "}
              {data?.ten_chietkhau}
            </Typography>
          </Stack>
          <Image
            src="/discount.svg"
            alt="Discount icon"
            width={60}
            height={60}
          />
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={1}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
          sx={{
            padding: "10px",
          }}
        >
          <Typography>
            <Typography component="span" sx={{ fontWeight: 600 }}>
              Hạn dùng:
            </Typography>{" "}
            <Typography component="span">
              {formatDateDisplay(data?.hieu_luc_den, "DD/MM/YYYY HH:mm")}
            </Typography>
          </Typography>
          <Stack
            direction="row"
            justifyContent={{ xs: "space-between", sm: "flex-end" }}
            alignItems="center"
            gap={1}
          >
            <Button
              onClick={() => setOpenModal(true)}
              startIcon={<BsInfoCircle size={14} />}
              sx={{ textTransform: "none" }}
            >
              Điều kiện
            </Button>
            <Button
              disabled={!isReach}
              variant="contained"
              onClick={handleSelectDiscount}
              sx={{
                color: "common.white",
                boxShadow: "none",
                backgroundColor: isSelected ? "error.main" : "primary.main",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: isSelected ? "error.main" : "primary.main",
                },
              }}
            >
              {isSelected ? "Bỏ chọn" : "Áp dụng"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default Discount;
