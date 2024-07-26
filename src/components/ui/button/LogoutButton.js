import React from "react";
import { Button } from "@mui/material";
import { handleLogout } from "~/app/actions";
import useConfirm from "~/hooks/useConfirm";

function LogoutButton({ children, sx = {}, renderItem }) {
  const { showConfirm } = useConfirm();

  const allowLogout = async () => {
    await handleLogout();
    window.location.reload();
  };

  const logout = () => {
    showConfirm({
      title: "Đăng xuất",
      width: "400px",
      message: "Bạn có chắc muốn đăng xuất không ?",
      onConfirm: allowLogout,
    });
  };
  if (!!renderItem) {
    return renderItem({ onClick: logout });
  }
  return (
    <Button
      variant="contained"
      sx={{
        color: "common.white",
        backgroundColor: "error.main",
        "&:hover": { backgroundColor: "error.main" },
        ...sx,
      }}
      onClick={logout}
    >
      {children}
    </Button>
  );
}

export default LogoutButton;
