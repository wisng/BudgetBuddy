import React from "react";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from "@mui/material";
import MonthPicker from "../components/MonthPicker";
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const Insights = ({ budget, goals }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={2} sx={{}}></Grid>
        <Grid size={8}>
          <MonthPicker startDate={budget.creationDate} handleSubmit={() => alert("HELLO")} />
        </Grid>
        <Grid size={2} sx={{}}></Grid>
      </Grid>

      <Grid
        container
        size={7} 
        sx={{padding:"2rem", justifySelf:"center", borderRadius:"20px"}}>
        <Paper 
          elevation={2} 
          square={false}>
          <LineChart
            sx={{backgroundColor:"white", borderRadius:"50px"}}
            width={800}
            height={300}
            series={[
              { data: pData, label: 'Expenses' },
              { data: uData, label: 'uv' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
          />
          </Paper>
      </Grid>


    </Box>
  );
};

export default Insights;
