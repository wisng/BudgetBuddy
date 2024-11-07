import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const BUDGET = {
  budgetID: 1,
  totalBalance: 15000.22,
  totalIncome: 45000.55,
  totalExpenses: 30000.31,
  accountType: "Individual",
  financialHealthScore: 75,
  creationDate: "2023-01-15",
};

const GOALS = [
  {
    spendingGoalID: 1,
    title: "Groceries",
    categoryID: 2,
    limit: 400.0,
    currAmount: 150.0,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    isExceeded: false,
    budgetID: 1,
  },
  {
    spendingGoalID: 2,
    title: "Dining Out",
    categoryID: 3,
    limit: 300.0,
    currAmount: 350.0,
    startDate: "2024-10-15",
    endDate: "2024-11-15",
    isExceeded: true,
    budgetID: 1,
  },
  {
    spendingGoalID: 3,
    title: "Transportation",
    categoryID: 4,
    limit: 150.0,
    currAmount: 90.0,
    startDate: "2024-11-05",
    endDate: "2024-11-25",
    isExceeded: false,
    budgetID: 2,
  },
  {
    spendingGoalID: 4,
    title: "Entertainment",
    categoryID: 5,
    limit: 600.0,
    currAmount: 200.0,
    startDate: "2024-11-10",
    endDate: "2024-12-10",
    isExceeded: false,
    budgetID: 3,
  },
];

const Wrapper = ({ Component }) => {
  const [account, setAccount] = useState("My Budget");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Navbar account={account} setAccount={setAccount} />
      <Component budget={BUDGET} goals={GOALS} /> {/* Render the passed-in component here */}
    </Box>
  );
};

export default Wrapper;
