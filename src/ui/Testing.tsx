import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { brown, orange } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import React from "react";

interface TestingProps {
  x: any;
}

const Testing = ({ x }: TestingProps) => {
  return (
    <Grid
      container
      direction="column"
      height={"40vh"}
      width="400px"
      justifyContent="space-around"
      sx={{ backgroundColor: orange[50] }}
    >
      <Grid item>לחצנים</Grid>
      <Grid item>
        <TextField
          InputProps={{
            readOnly: true,
          }}
        >
          ad
        </TextField>
      </Grid>
      <Grid item>
        <Button>אשר</Button>
      </Grid>
      <Grid item>תוצר</Grid>
    </Grid>
  );
};

export default Testing;
