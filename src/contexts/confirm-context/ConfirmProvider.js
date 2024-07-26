"use client";
import React, { createContext, useState } from "react";
import DialogConfirm from "~/components/ui/dialog/DialogConfirm";

export const ConfirmContext = createContext();

const defaultWidth = "400px";

function ConfirmProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [localWidth, setLocalWidth] = useState();
  const [localMessage, setLocalMessage] = useState("");
  const [confirmFunc, setConfirmFunc] = useState(null);

  const handleClose = () => setOpen(false);

  const showConfirm = ({ title, width, message, onConfirm }) => {
    setOpen(true);
    setTitle(title);
    setLocalWidth(width || defaultWidth);
    setLocalMessage(message);
    setConfirmFunc(() => onConfirm);
  };

  return (
    <ConfirmContext.Provider
      value={{
        showConfirm,
      }}
    >
      <DialogConfirm
        message={localMessage}
        open={open}
        onClose={handleClose}
        onConfirm={confirmFunc}
        title={title}
        width={localWidth}
      />
      {children}
    </ConfirmContext.Provider>
  );
}

export default ConfirmProvider;
