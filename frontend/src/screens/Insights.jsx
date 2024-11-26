import React from "react";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from "@mui/material";
import MonthPicker from "../components/MonthPicker";

const Insights = ({ budget }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={2} sx={{}}></Grid>
        <Grid size={8}>
          <MonthPicker startDate={budget.creationDate} handleSubmit={() => alert("HELLO")} />
        </Grid>
        <Grid size={2} sx={{}}></Grid>
      </Grid>
    </Box>
  );
};

export default Insights;
