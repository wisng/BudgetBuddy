import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from "@mui/material";
// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { PieChart } from "@mui/x-charts/PieChart";
import BudgetFunction from "../components/BudgetFunction";
import MonthPicker from "../components/MonthPicker";
import PaidIcon from "@mui/icons-material/Paid";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import PieChartSharpIcon from "@mui/icons-material/PieChartSharp";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddTransactionModal from "../components/AddTransactionModal";
import AddGoalModal from "../components/AddGoalModal";
import AddCategoryModal from "../components/AddCategoryModal";
import AddUserModal from "../components/AddUserModal";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Home = ({ budget, goals }) => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

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
    <Box>
      <Grid container spacing={2}>
        <Grid size={2} sx={{}}></Grid>
        <Grid size={8}>
          <MonthPicker startDate={budget.creationDate} handleSubmit={() => alert("HELLO")} />
        </Grid>
        <Grid size={2} sx={{}}></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={2} sx={{}}></Grid>
        <Grid container size={5} sx={{ height: "325px" }}>
          <Paper elevation={3} sx={{ height: "100%", width: "100%", borderRadius: "20px" }}>
            <Grid container>
              <Grid size={{ xs: 1, lg: 2.5 }} sx={{}}></Grid>
              <Grid size={{ xs: 10, lg: 7 }} sx={{ position: "relative", height: "100%", paddingBottom: 3 }}>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  Financial Health Score
                </Typography>

                <PieChart
                  // sx={{ position: "absolute", top: "15%", left: "10%" }}
                  colors={["#FE6C6C", "#FEBD38"]}
                  series={[
                    {
                      startAngle: -90,
                      endAngle: 90,
                      innerRadius: 100,
                      outerRadius: 180,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      cx: "70%",
                      cy: "75%",
                      data: [{ value: budget.financialHealthScore }, { value: 100 - budget.financialHealthScore }],
                    },
                  ]}
                  height={300}
                />
                <Paper
                  elevation={3}
                  sx={{
                    height: 120,
                    width: 120,
                    borderRadius: 50,
                    position: "absolute",
                    top: "50%",
                    left: "37%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h3">{budget.financialHealthScore}</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 1, lg: 2.5 }} sx={{}}></Grid>
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
            height: "325px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: "30%",
              width: "100%",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginLeft: 3 }}>
              <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                Total Balance
              </Typography>

              <Typography variant="h5">
                <AttachMoneyIcon fontSize="small" /> {budget.totalBalance}
              </Typography>
            </Box>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              height: "30%",
              width: "100%",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginLeft: 3 }}>
              <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                Total Income
              </Typography>

              <Typography variant="h5" sx={{ color: "#2BDE73" }}>
                <AttachMoneyIcon fontSize="small" /> {budget.totalIncome}
              </Typography>
            </Box>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              height: "30%",
              width: "100%",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginLeft: 3 }}>
              <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                Total Expenses
              </Typography>

              <Typography variant="h5" sx={{ color: "#EA4335" }}>
                <AttachMoneyIcon fontSize="small" /> {budget.totalExpenses}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={2} sx={{}}></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Grid size={2} sx={{}}></Grid>
        <Grid container size={4} sx={{ minHeight: "500px", maxHeight: "550px" }}>
          <BudgetFunction
            title="Add Transaction"
            icon={<PaidIcon sx={{ color: "#7459D9", fontSize: "60px" }} />}
            handleClick={setShowTransactionModal}
          />
          <BudgetFunction
            title="Add Goal"
            icon={<AdsClickIcon sx={{ color: "#7459D9", fontSize: "60px" }} />}
            handleClick={setShowGoalModal}
          />
          <BudgetFunction
            title="Add Custom Category"
            icon={<AddCircleRoundedIcon sx={{ color: "#7459D9", fontSize: "60px" }} />}
            handleClick={setShowCategoryModal}
          />
          <BudgetFunction
            title="Add User"
            icon={<AccountCircleRoundedIcon sx={{ color: "#7459D9", fontSize: "60px" }} />}
            handleClick={setShowUserModal}
          />
          <BudgetFunction
            title="View Financial Report"
            icon={<PieChartSharpIcon sx={{ color: "#7459D9", fontSize: "60px" }} />}
          />
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

            {goals.map((g, i) => {
              let percentage = Math.round((g.currAmount / g.limit) * 100);

              // Cap at 100% if currAmount exceeds limit
              if (percentage > 100) percentage = 100;

              return (
                <Grid key={i} container>
                  <Grid size={6} sx={{}}>
                    <PieChart
                      colors={["#7459D9", "#F2F2F7"]}
                      series={[
                        {
                          data: [
                            { id: 1, value: percentage },
                            { id: 2, value: 100 - percentage },
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
                    size={4}
                    sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                  >
                    <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                      {g.title}
                    </Typography>

                    <Typography variant="h5">
                      <AttachMoneyIcon fontSize="small" /> {g.currAmount}/{g.limit}
                    </Typography>
                    <Typography variant="body2">{g.endDate}</Typography>
                  </Grid>
                  <Grid size={2}></Grid>
                </Grid>
              );
            })}
          </Paper>
        </Grid>
        <Grid size={2} sx={{}}></Grid>
      </Grid>
      <AddTransactionModal showModal={showTransactionModal} setShowModal={setShowTransactionModal} />
      <AddGoalModal showModal={showGoalModal} setShowModal={setShowGoalModal} />
      <AddCategoryModal showModal={showCategoryModal} setShowModal={setShowCategoryModal} />
      <AddUserModal showModal={showUserModal} setShowModal={setShowUserModal} />
    </Box>
  );
};

export default Home;
