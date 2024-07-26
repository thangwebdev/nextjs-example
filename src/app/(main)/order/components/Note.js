"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AreaInput from "~/components/ui/input/AreaInput";
import { useAppContext } from "~/contexts/ContextProvider";
import { asyncPutData } from "~/utils/httpRequest";
import { cloneDeep } from "lodash";

function Note({ pbl }) {
  const { token, showAlert, setShowBackdrop } = useAppContext();
  const [note, setNote] = useState(pbl?.dien_giai || "");
  const noteRef = useRef(pbl?.dien_giai || "");

  const handleUpdateNote = async () => {
    try {
      if (!pbl || note === noteRef.current) return;
      setShowBackdrop(true);
      const pblClone = cloneDeep(pbl);
      pblClone.dien_giai = note;
      const resp = await asyncPutData({
        apiCode: "pbl_pharma",
        id: pblClone._id,
        token,
        data: pblClone,
      });

      if (resp.status !== 200) {
        showAlert({
          title: "Vui lòng thử lại",
          width: "400px",
          type: "error",
          message: "Lỗi khi cập nhật thông tin đơn hàng",
        });
      } else {
        noteRef.current = note;
      }
    } finally {
      setShowBackdrop(false);
    }
  };

  useEffect(() => {
    setNote(pbl?.dien_giai || "");
    noteRef.current = pbl?.dien_giai || "";
  }, [pbl]);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Ghi chú đơn hàng</Typography>
      <Typography sx={{ color: "text.secondary" }}>
        Bạn cũng có thể ghi chú mọi thắc mắc về chương trình, giá cả,... Chúng
        tôi sẽ liên hệ đến bạn để giải đáp.
      </Typography>
      <Stack direction="row" alignItems="center" gap={1}>
        <AreaInput
          value={note}
          onChange={(e) => {
            const val = e.target.value || "";
            setNote(val);
          }}
          onBlur={handleUpdateNote}
          placeholder="Nhập ghi chú đơn hàng"
        />
      </Stack>
    </Box>
  );
}

export default Note;
