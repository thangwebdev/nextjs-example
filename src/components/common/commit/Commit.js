import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CardSimple from "~/components/ui/card/CardSimple";
import { COMMITS } from "~/utils/ui-constants";

function Commit({ vertical }) {
  const columnProps = {
    xs: 12,
    sm: 6,
    md: 3,
    ...(vertical ? { xs: 12, sm: 12, md: 12 } : {}),
  };

  return (
    <Grid container spacing={2}>
      {COMMITS.map((commit) => (
        <Grid key={commit.id} {...columnProps}>
          <CardSimple data={commit} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Commit;
