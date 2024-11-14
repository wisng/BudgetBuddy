import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from "@mui/material";
// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { PieChart } from "@mui/x-charts/PieChart";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  const [budgetData, setBudgetData] = useState({});
  const [userID, setUserID] = useState(null);
  

  // NOT WORKING YET
  // useEffect(() => {
  //   const token = localStorage.getItem("jwt-token");
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     console.log(token);
  //     console.log("userid", decoded.userId);
  //     setUserID(decoded.userId);
  //   }
  // }, []);

  // const getBudgetData = async () => {
  //   const res = await axios.get("http://localhost:5000/api/budgets", { userID });
  //   console.log(res.data);
  //   setBudgetData(res.data);
  // };

  // useEffect(() => {
  //   getBudgetData();
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Navbar />
      <Grid container spacing={2}>
        <Grid size={2} sx={{}}></Grid>
        <Grid container size={5} sx={{ height: "300px" }}>
          <Paper elevation={3} sx={{ height: "100%", width: "100%", borderRadius: "20px" }}>
            <Grid container sx={{ height: "100%" }}>
              <Grid size={1} sx={{}}></Grid>
              <Grid size={10} sx={{}}>
                <PieChart
                  colors={["#FE6C6C", "#FEBD38"]}
                  series={[
                    {
                      startAngle: -90,
                      endAngle: 90,
                      innerRadius: 100,
                      outerRadius: 180,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      cx: "65%",
                      cy: "75%",
                      data: [{ value: 80 }, { value: 20 }],
                    },
                  ]}
                  height={300}
                />
              </Grid>
              <Grid size={1} sx={{}}></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          container
          size={3}
          spacing={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "300px",
          }}
        >
          <Paper elevation={3} sx={{ height: "30%", width: "100%", borderRadius: "20px" }}></Paper>
          <Paper elevation={3} sx={{ height: "30%", width: "100%", borderRadius: "20px" }}></Paper>
          <Paper elevation={3} sx={{ height: "30%", width: "100%", borderRadius: "20px" }}></Paper>
        </Grid>
        <Grid size={2} sx={{}}></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Grid size={2} sx={{}}></Grid>
        <Grid container size={4} sx={{}}>
          <Paper elevation={3} sx={{ minHeight: "100px", width: "100%", borderRadius: "20px" }}></Paper>
          <Paper elevation={3} sx={{ minHeight: "100px", width: "100%", borderRadius: "20px" }}></Paper>
          <Paper elevation={3} sx={{ minHeight: "100px", width: "100%", borderRadius: "20px" }}></Paper>
          <Paper elevation={3} sx={{ minHeight: "100px", width: "100%", borderRadius: "20px" }}></Paper>
          {/* <Paper elevation={3} sx={{minHeight: "100px", width: "100%", borderRadius: "20px"}}></Paper> */}
        </Grid>
        <Grid
          container
          size={4}
          spacing={1}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}
        >
          <Paper elevation={3} sx={{ minHeight: "300px", width: "100%", borderRadius: "20px" }}>
            <Grid container>
              <Grid size={2} sx={{}}></Grid>
              <Grid size={8} sx={{}}>
                <p>Spending Goals</p>
              </Grid>
              <Grid size={2} sx={{}}></Grid>
            </Grid>
            <Grid container>
              <Grid size={6} sx={{}}>
                <PieChart
                  colors={["#7459D9", "#F2F2F7"]}
                  series={[
                    {
                      data: [
                        { id: 1, value: 80 },
                        { id: 2, value: 20 },
                      ],
                      innerRadius: 40,
                      outerRadius: 60,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 360,
                      cx: 100,
                      cy: 100,
                    },
                  ]}
                  height={200}
                />
              </Grid>
              <Grid
                size={6}
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <p>Goal #1</p>
              </Grid>
            </Grid>

            <Grid container>
              <Grid size={6} sx={{}}>
                <PieChart
                  colors={["#7459D9", "#F2F2F7"]}
                  series={[
                    {
                      data: [
                        { id: 1, value: 50 },
                        { id: 2, value: 50 },
                      ],
                      innerRadius: 40,
                      outerRadius: 60,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 360,
                      cx: 100,
                      cy: 100,
                    },
                  ]}
                  height={200}
                />
              </Grid>
              <Grid
                size={6}
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <p>Goal #2</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid size={2} sx={{}}></Grid>
      </Grid>
    </Box>
  );
};

export default Home;
