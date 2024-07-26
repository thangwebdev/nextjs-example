import { useContext } from "react";
import { ConfirmContext } from "~/contexts/confirm-context/ConfirmProvider";

const useConfirm = () => {
  const value = useContext(ConfirmContext);
  if (!value)
    throw new Error("ConfirmContext must be used inside ConfirmProvider");
  return value;
};
export default useConfirm;
