import React from "react";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from "@mui/material";
import MonthPicker from "../components/MonthPicker";
import { LineChart, BarChart, PieChart } from '@mui/x-charts';
import { alpha, useTheme } from "@mui/material";
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const spendingHabits = {
  "Groceries": 150,
  "Entertainment": 50,
  "Gas/Automobile": 200,
  "Recurring Payments": 50
}

const uData = [4000, 3000, 2000, 6780, 7890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
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

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2} sx={{fontSize:"45px", fontWeight:"600"}}>
      {children}
    </StyledText>
  );
}


const Colorswitch = () => {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  return (
      <>
          <defs>
              <linearGradient id="paint0_linear_45_2" x1="300.25" y1="46.9999" x2="300.25" y2={`${svgHeight}px`} gradientUnits="userSpaceOnUse">
                  <stop stop-color="#dad4f9" stop-opacity="0.4" />
                  <stop offset="1" stop-color="#2F4CDD" stop-opacity="0" />
              </linearGradient>
          </defs>

          <defs>
              <linearGradient id="paint0_linear_45_3" x1="299.498" y1="-4.28272" x2="299.498" y2={`${svgHeight}px`} gradientUnits="userSpaceOnUse">
                  <stop stop-color="#B519EC" stop-opacity="0.4" />
                  <stop offset="1" stop-color="#B519EC" stop-opacity="0" />
              </linearGradient>
          </defs>
      </>
  )
}

const Insights = ({ budget, goals }) => {
  const theme = useTheme();
  return (
    <Box>
      {/* <Grid container spacing={2}>
        <Grid size={2} sx={{}}></Grid>
        <Grid size={8}>
          <MonthPicker startDate={budget.creationDate} handleSubmit={() => alert("HELLO")} />
        </Grid>
        <Grid size={2} sx={{}}></Grid>
      </Grid> */}
      <Grid
        container
        spacing={4}
      >
        <Grid size={2}></Grid>
        <Grid
          size={7}
        > 
        <Paper 
          sx={{borderRadius:"30px", padding:"2rem", marginTop:"0.5rem", marginBottom:"2rem"}} 
          elevation={2} 
          square={false}>
          <Typography variant="h5" sx={{position:"relative", top:"0rem", alignSelf:"flex-start", fontWeight:"600", textAlign:"left", marginLeft:"0.,5rem"}}>
            Transactions
          <Grid sx={{position:"relative", top:"-2.5rem", left:"12rem", width:"50%"}}>
            <MonthPicker startDate={budget.creationDate} handleSubmit={() => alert("HELLO")} />
          </Grid>
          </Typography>
          <LineChart
            leftAxis={{
              disableLine: true,
              disableTicks: true
            }}
            bottomAxis={{
              disableTicks: true
            }}
            sx={{backgroundColor:"white", borderRadius:"50px"}}
            height={300}
            series={[
              { data: pData, area: true, color:"#dad4f9", label:"Expenses"},
              { data: uData,  color:"#8c75ff", label: "Income"},
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            slotProps={{
              legend: {
                  direction: 'row',
                  position: { vertical: 'top', horizontal: 'right' },
                  itemGap: 62,
              },
          }}
          />
          <Colorswitch />
          </Paper>
          </Grid>
          <Grid size={3}></Grid>
      </Grid>
      <Grid container spacing={1} sx={{marginBottom:"25px"}}>
        <Grid size={2}></Grid>
        <Grid size={3}>
          <Paper
          sx={{borderRadius:"30px"}}  
          elevation={2} 
          square={false}>
          <Typography variant="h5" sx={{position:"relative", top:"1rem", alignSelf:"flex-start", fontWeight:"600", textAlign:"left", marginLeft:"3rem"}}>
            Daily Spending
          </Typography>
           <BarChart
              sx={{marginRight:"1.5em"}}
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
            <Typography variant="h5" sx={{position:"relative", top:"1rem", alignSelf:"flex-start", fontWeight:"600", textAlign:"left", marginLeft:"3rem"}}>
              Spending Habits
            </Typography>
          <PieChart
            sx={{marginLeft:"65px"}}
            colors={["#FE6C6C", "#FEBD38"]}
            series={[
              {
                startAngle: 0,
                endAngle: 360,
                innerRadius: 100,
                outerRadius: 180,
                paddingAngle: 3,
                cornerRadius: 10,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                data: [
                  { value: spendingHabits.Groceries, label: "Groceries", color:"#FFD26A" } , 
                  { value: spendingHabits.Entertainment, label: "Entertainment", color:"#73CFFC" },
                  { value: spendingHabits["Gas/Automobile"], label: "Gas/Automobile", color:"#FE63BF" },
                  { value: spendingHabits["Recurring Payments"], label: "Recurring Payments", color:"#FD5357" }
                ],
              },
            ]}
            height={400}
            width={500}
            slotProps={{
              legend: { hidden: true },
            }}
          >
          <PieCenterLabel>$450</PieCenterLabel>
          </PieChart>
          </Paper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Insights;
