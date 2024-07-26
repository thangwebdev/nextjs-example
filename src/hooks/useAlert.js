import { useState } from "react";

const defaultWidth = "400px";
const defaultType = "error"; // success, warning, info, error

function useAlert() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [localWidth, setLocalWidth] = useState();
  const [localMessage, setLocalMessage] = useState("");
  const [type, setType] = useState();

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setLocalMessage("");
    setType("");
  };

  const showAlert = ({ title, width, message, type }) => {
    setOpen(true);
    setTitle(title);
    setType(type || defaultType);
    setLocalWidth(width || defaultWidth);
    setLocalMessage(message);
  };

  return {
    showAlert,
    open,
    title,
    type,
    width: localWidth,
    message: localMessage,
    onClose: handleClose,
  };
}

export default useAlert;
