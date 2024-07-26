import React from "react";
import { List } from "@mui/material";
import { isArray } from "lodash";
import GroupItem from "./GroupItem";

const emptyValue = ["", undefined, null];

function Groups({ groups = [], onCloseFilter }) {
  const parentGroups = groups.filter((g) => emptyValue.includes(g.nh_me));

  return (
    <List>
      <GroupItem
        data={{ ten_nvt: "Tất cả", _id: "" }}
        onCloseFilter={onCloseFilter}
      />
      {!!parentGroups &&
        isArray(parentGroups) &&
        parentGroups.map((g) => {
          const subs = groups.filter((item) => item.nh_me === g._id);
          return (
            <GroupItem
              key={g._id}
              data={g}
              subs={subs?.length > 0 ? subs : undefined}
              onCloseFilter={onCloseFilter}
            />
          );
        })}
    </List>
  );
}

export default Groups;
