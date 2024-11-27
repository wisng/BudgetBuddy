import React from "react";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from "@mui/material";
import MonthPicker from "../components/MonthPicker";
import { LineChart, BarChart, PieChart } from '@mui/x-charts';

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
export const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Mon',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Tues',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Wed',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Thurs',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'Fri',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'Sat',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'Sun',
  }
];


const chartSetting = {
  yAxis: [],
  width: 500,
  height: 400,
};


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
        sx={{padding:"2rem", justifySelf:"center"}}>
        <Paper 
          sx={{borderRadius:"30px", padding:"2rem"}} 
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
      <Grid container spacing={1} sx={{marginBottom:"25px"}}>
        <Grid size={2}></Grid>
        <Grid size={3}>
          <Paper 
          sx={{borderRadius:"30px"}}  
          elevation={2} 
          square={false}>
           <BarChart
              sx={{}}
              leftAxis={null}
              bottomAxis={{
                disableLine: true,
                disableTicks: true
              }}
              borderRadius={20}
              dataset={dataset}
               xAxis={[{ scaleType: 'band', data: dataset.map((i)=>i.month)}]}
               series={[{ data: dataset.map((item)=> item.london), color: "#646cffaa" }, { data: dataset.map((item)=> item.newYork), color: "#535bf2"}]}
               {...chartSetting}
            />
          </Paper>
        </Grid>

        <Grid size={1}></Grid>
        <Grid size={3}>
        <Paper
          sx={{borderRadius:"30px"}}  
          elevation={1}
          square={false}>
          <PieChart
              sx={{ top: "15%", left: "10%" }}
              colors={["#FE6C6C", "#FEBD38"]}
              series={[
                {
                  startAngle: 0,
                  endAngle: 360,
                  innerRadius: 100,
                  outerRadius: 180,
                  paddingAngle: 3,
                  cornerRadius: 10,
                  cx: "80%",
                  cy: "50%",
                  data: [{ value: budget.financialHealthScore }, { value: 100 - budget.financialHealthScore }],
                },
              ]}
              height={400}
              width={400}
              />
          </Paper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Insights;
