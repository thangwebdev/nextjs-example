"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "~/actions/auth.action";
import DialogAlert from "~/components/ui/dialog/DialogAlert";
import useAlert from "~/hooks/useAlert";
import ConfirmProvider from "./confirm-context/ConfirmProvider";
import { ToastContainer } from "react-toastify";
import { getCart } from "~/actions/cart.action";
import { asyncGetList } from "~/utils/httpRequest";
import { Backdrop } from "@mui/material";
import PBLProvider from "./pbl-context/PBLProvider";
import { updateCustomer } from "~/actions/customer.action";
import { cloneDeep } from "lodash";

const AppContext = createContext();

function ContextProvider({ children, token, email, password }) {
  const {
    showAlert,
    open: openAlert,
    title,
    width,
    message,
    type,
    onClose: onCloseAlert,
  } = useAlert();
  const [profile, setProfile] = useState();
  const [customer, setCustomer] = useState();
  const [deliveries, setDeliveries] = useState([]);
  const [cart, setCart] = useState();
  const [showBackdrop, setShowBackdrop] = useState(false);

  const initProfile = async () => {
    const resp = await getProfile(token);
    if (resp.status === 200) {
      setProfile(resp.data);
    } else {
      showAlert({
        title: "Vui lòng thử lại",
        width: "400px",
        type: "error",
        message:
          resp.response.data.message ||
          resp.response.data.error ||
          "Lỗi khi tải thông tin tài khoản",
      });
    }
  };
  const initCustomer = async () => {
    try {
      setShowBackdrop(true);
      const resp = await asyncGetList({
        apiCode: "customer",
        token,
        condition: { page: 1, limit: 1, q: { of_user: profile?.email } },
      });
      if (resp.status === 200) {
        setCustomer(resp.data[0]);
      }
    } finally {
      setShowBackdrop(false);
    }
  };
  const initCart = async () => {
    try {
      setShowBackdrop(true);
      const resp = await getCart({
        token,
        ma_kh: customer?.ma_kh,
      });
      if (resp.status === 200) {
        setCart(resp.data);
        await refreshChietkhau(resp.data);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message ||
            resp.data.error ||
            "Lỗi khi tải thông tin giỏ hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };
  const initDelivery = async () => {
    try {
      setShowBackdrop(true);
      const resp = await asyncGetList({
        token,
        apiCode: "thongtingiaohang",
        condition: { page: 1, limit: 99999, q: { ma_kh: customer?.ma_kh } },
      });
      if (resp.status === 200) {
        setDeliveries(resp.data);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message ||
            resp.data.error ||
            "Lỗi khi tải thông tin giao hàng",
        });
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  const refreshChietkhau = async (cart = []) => {
    const currentChietKhau = customer?.exfields?.dmchietkhau;
    if (!currentChietKhau) return;
    const customerClone = cloneDeep(customer);
    const tienHang = (cart || [])
      .filter((item) => item.status)
      .reduce((acc, item) => {
        return acc + item.gia_ban_le * item.sl_xuat;
      }, 0);
    let tienMin = currentChietKhau.gt_hd_tu || 0;
    if (tienHang < tienMin) {
      customerClone.exfields.dmchietkhau = null;
      const resp = await updateCustomer({
        id: customer._id,
        data: customerClone,
        token,
      });
      if (resp.status === 200) {
        showAlert({
          title: "Cảnh báo",
          width: "400px",
          type: "warning",
          message: `Mã giảm giá '${currentChietKhau.ma_chietkhau}' đã bị hủy do không thỏa mãn điều kiện`,
        });
        setCustomer(resp.data);
      } else {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message:
            resp.data.message ||
            resp.data.error ||
            "Lỗi khi tải thông tin giảm giá",
        });
      }
    }
  };

  useEffect(() => {
    if (token) {
      initProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  useEffect(() => {
    if (profile?.email) {
      initCustomer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);
  useEffect(() => {
    if (customer?.ma_kh) {
      initCart();
      initDelivery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => console.log("scope is: ", registration.scope));
  //   }
  // }, []);

  return (
    <>
      <Backdrop open={showBackdrop} sx={{ zIndex: 999999 }}>
        <div className="loader"></div>
      </Backdrop>
      <AppContext.Provider
        value={{
          token,
          email,
          password,
          profile,
          customer,
          deliveries,
          cart,
          setShowBackdrop,
          showAlert,
          initCart,
          initCustomer,
          initDelivery,
          refreshChietkhau,
        }}
      >
        <DialogAlert
          title={title}
          open={openAlert}
          message={message}
          onClose={onCloseAlert}
          width={width}
          type={type}
        />
        <ToastContainer autoClose={2500} />
        <ConfirmProvider>
          <PBLProvider>{children}</PBLProvider>
        </ConfirmProvider>
      </AppContext.Provider>
    </>
  );
}

export default ContextProvider;

export const useAppContext = () => {
  const value = useContext(AppContext);
  if (!value) throw new Error("AppContext must be used inside AppProvider");
  return value;
};
