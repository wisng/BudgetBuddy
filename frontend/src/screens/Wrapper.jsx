import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import customAxiosInstance from "../utils/customAxiosInstance";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MovieIcon from "@mui/icons-material/Movie";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { useNavigate } from "react-router-dom";

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

const CATEGORY_ICONS = {
  Entertainment: <MovieIcon />,
  Shopping: <LocalMallIcon />,
  "Dining Out": <FastfoodIcon />,
  Transportation: <DirectionsCarFilledIcon />,
};

const CATEGORIES = [
  {
    categoryID: 1,
    name: "Entertainment",
    colour: "#00FF00",
    isCustom: 1,
    budgetID: 1,
  },
  {
    categoryID: 2,
    name: "Shopping",
    colour: "#FF0000",
    isCustom: 1,
    budgetID: 1,
  },
  {
    categoryID: 3,
    name: "Dining Out",
    colour: "#0000FF",
    isCustom: 1,
    budgetID: 1,
  },
  {
    categoryID: 4,
    name: "Transportation",
    colour: "#00FFFF",
    isCustom: 1,
    budgetID: 1,
  },
  {
    categoryID: 5,
    name: "Groceries",
    colour: "#09FFFF",
    isCustom: 1,
    budgetID: 1,
  },
];

const Wrapper = ({ Component }) => {
  const [account, setAccount] = useState("My Budgets");
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const changeScreen = useNavigate();

  const fetchAllBudgets = async () => {
    try {
      const budgetRes = await customAxiosInstance.get("/budgets");
      console.log("BUDGETS", budgetRes.data);
      setBudgets(budgetRes.data);
      if (budgetRes.data.length > 0) {
        setSelectedBudget(budgetRes.data[0]);
      }
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      changeScreen("/");
    }
  };

  const fetchAllCategories = async (budgetID) => {
    try {
      const categoriesRes = await customAxiosInstance.get(`/budget/${budgetID}/categories`);
      console.log("CATEGORIES", categoriesRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      changeScreen("/");
    }
  };

  const fetchAllGoals = async (budgetID) => {
    try {
      const goalsRes = await customAxiosInstance.get(`/budget/${budgetID}/spendingGoals`);
      console.log("GOALS", goalsRes.data);
      setGoals(goalsRes.data);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    }
  };

  const fetchAllUsers = async (budgetID) => {
    try {
      const usersRes = await customAxiosInstance.get(`/budget/${budgetID}/getAllBudgetUsers`);
      console.log("USERS", usersRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    }
  };

  const addCategoryIcon = (categories) => {
    let result = [];
    for (let c of categories) {
      if (c.name in CATEGORY_ICONS) {
        c.icon = CATEGORY_ICONS[c.name];
      }
      result.push(c);
    }
    return result;
  };

  useEffect(() => {
    let token = localStorage.getItem("jwt-token");
    if (!token) {
      changeScreen("/");
    }
    if (selectedBudget || refresh) {
      fetchAllCategories(selectedBudget.budgetID);
      fetchAllGoals(selectedBudget.budgetID);
      fetchAllUsers(selectedBudget.budgetID);
    } else {
      fetchAllBudgets();
    }
  }, [selectedBudget, refresh]);

  if (budgets.length === 0) {
    return <div>Loading budget...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Navbar account={account} setAccount={setAccount} budgets={budgets} setSelectedBudget={setSelectedBudget} />
      <Component
        budget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
        goals={goals}
        categories={addCategoryIcon(categories)}
        users={users}
        setRefresh={setRefresh}
      />
      {/* Render the passed-in component here */}
    </Box>
  );
};

export default Wrapper;
