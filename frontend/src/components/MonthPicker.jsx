import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, IconButton, Grid2 as Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthPicker = ({ handleSubmit }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  return (
    <Grid container spacing={0} sx={{ height: "100%", width: 250 }}>
      <Grid size={5} sx={{}}>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="month-select-label">Month</InputLabel>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={month}
            label="Month"
            onChange={handleMonthChange}
          >
            {MONTHS.map((m) => (
              <MenuItem value={m}>{m}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select labelId="year-select-label" id="year-select" value={year} label="Year" onChange={handleYearChange}>
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <IconButton aria-label="delete" onClick={handleSubmit}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MonthPicker;
