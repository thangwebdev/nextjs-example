import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Zoom,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

function DialogBase({
  open,
  onClose,
  width = "400px",
  title,
  content,
  actions,
  renderTitle,
  zIndex,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{ sx: { m: 1 } }}
      sx={{ zIndex, "& .MuiPaper-root": { maxWidth: "unset", width } }}
    >
      {!!renderTitle ? (
        renderTitle()
      ) : (
        <DialogTitle sx={{ fontSize: "18px", p: 2 }}>
          {title || "Title here"}
        </DialogTitle>
      )}
      <DialogContent sx={{ p: 2 }}>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}

export default DialogBase;
