"use client";
import React, { Suspense, useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

function GroupItemComp({ data, subs, isSub, onCloseFilter }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [collapse, setCollapse] = useState(false);

  const active = (searchParams.get("group") || "") === data._id;

  const handleSelect = () => {
    if (!!subs && subs.length > 0) {
      setCollapse(!collapse);
    } else {
      onCloseFilter?.();
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("group", data._id);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Suspense>
      <ListItemButton
        onClick={handleSelect}
        sx={{ px: 0, py: 0.8, pl: isSub ? 4 : 0, borderRadius: "10px" }}
      >
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: active ? "primary.main" : "",
              fontWeight: active ? 600 : 400,
            },
          }}
        >
          {data.ten_nvt}
        </ListItemText>
        {!!subs ? (
          <ListItemIcon
            sx={{ minWidth: "20px", color: active ? "primary.main" : "" }}
          >
            {collapse ? <FaAngleDown size={16} /> : <FaAngleRight size={16} />}
          </ListItemIcon>
        ) : undefined}
      </ListItemButton>
      {subs && (
        <Collapse in={collapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subs.map((sub) => {
              return (
                <GroupItem
                  key={sub._id}
                  data={sub}
                  isSub
                  onCloseFilter={onCloseFilter}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </Suspense>
  );
}

function GroupItem({ data, subs, isSub, onCloseFilter }) {
  return (
    <Suspense>
      <GroupItemComp
        data={data}
        subs={subs}
        isSub={isSub}
        onCloseFilter={onCloseFilter}
      />
    </Suspense>
  );
}

export default GroupItem;
