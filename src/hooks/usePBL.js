import { useContext } from "react";
import { PBLContext } from "~/contexts/pbl-context/PBLProvider";

const usePBL = () => {
  const value = useContext(PBLContext);
  if (!value) throw new Error("PBLContext must be used inside PBLProvider");
  return value;
};
export default usePBL;
