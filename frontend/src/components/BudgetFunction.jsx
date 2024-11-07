import React from "react";
import { Paper, Grid2 as Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BudgetFunction = ({ title, icon, handleClick }) => {
  return (
    <Paper
      elevation={3}
      sx={{ minHeight: "100px", width: "100%", borderRadius: "20px", cursor: "pointer" }}
      onClick={() => handleClick(true)}
    >
      <Grid container spacing={1} sx={{ height: "100%" }}>
        <Grid size={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: 5 }}>
          {icon}
        </Grid>
        <Grid size={8} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <p>{title}</p>
        </Grid>
        <Grid size={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ArrowForwardIosIcon />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BudgetFunction;
