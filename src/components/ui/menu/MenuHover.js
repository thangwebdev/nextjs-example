import React from "react";
import { Tooltip } from "@mui/material";

function MenuHover({
  children,
  content,
  zIndex = 10,
  disablePortal = false,
  placement = "bottom-start",
}) {
  if (!content) return children;
  return (
    <Tooltip
      placement={placement}
      title={content || "content"}
      PopperProps={{ disablePortal }}
      disableFocusListener
      disableTouchListener
      slotProps={{
        popper: {
          sx: { zIndex },
        },
        tooltip: {
          sx: {
            padding: 0,
            marginTop: "2px !important",
            boxShadow: "0px 2px 5px 0px #00000033",
            color: "initial",
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

export default MenuHover;
