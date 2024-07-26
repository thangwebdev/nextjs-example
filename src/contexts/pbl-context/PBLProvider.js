import { createContext, useEffect, useState } from "react";
import { getPbl } from "~/actions/pbl.action";
import { useAppContext } from "../ContextProvider";

export const PBLContext = createContext();

function PBLProvider({ children }) {
  const { token, customer, showAlert } = useAppContext();
  const [pbl, setPbl] = useState();

  const handleGetPbl = async () => {
    const resp = await getPbl({ token, ma_kh: customer?.ma_kh });
    if (resp.status === 200) {
      setPbl(resp.data[0]);
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
  };

  useEffect(() => {
    handleGetPbl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PBLContext.Provider value={{ pbl, setPbl }}>
      {children}
    </PBLContext.Provider>
  );
}
export default PBLProvider;
