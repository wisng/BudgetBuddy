import React from "react";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from "@mui/material";
import MonthPicker from "../components/MonthPicker";
import TransactionGroup from "../components/TransactionGroup";

const INCOME_TRANSACTIONS = [
  {
    transactionID: 1,
    title: "Salary",
    categoryID: 1,
    budgetID: 1,
    amount: 3000.0,
    date: "2024-11-01",
    transactionType: "Income",
    recurrenceFrequency: "MONTHLY",
    recurrenceStartDate: "2024-11-01",
    recurrenceEndDate: null,
  },
  {
    transactionID: 2,
    title: "Freelance Project",
    categoryID: 2,
    budgetID: 1,
    amount: 1500.0,
    date: "2024-11-10",
    transactionType: "Income",
    recurrenceFrequency: null,
    recurrenceStartDate: null,
    recurrenceEndDate: null,
  },
  {
    transactionID: 3,
    title: "Investment Dividend",
    categoryID: 3,
    budgetID: 2,
    amount: 200.0,
    date: "2024-11-15",
    transactionType: "Income",
    recurrenceFrequency: "YEARLY",
    recurrenceStartDate: "2024-11-15",
    recurrenceEndDate: "2026-11-15",
  },
  {
    transactionID: 4,
    title: "Rental Income",
    categoryID: 4,
    budgetID: 3,
    amount: 1200.0,
    date: "2024-11-05",
    transactionType: "Income",
    recurrenceFrequency: "MONTHLY",
    recurrenceStartDate: "2024-11-05",
    recurrenceEndDate: null,
  },
  {
    transactionID: 5,
    title: "Gift",
    categoryID: 5,
    budgetID: 1,
    amount: 500.0,
    date: "2024-11-01",
    transactionType: "Income",
    recurrenceFrequency: null,
    recurrenceStartDate: null,
    recurrenceEndDate: null,
  },
];

const EXPENSE_TRANSACTIONS = [
  {
    transactionID: 6,
    title: "Groceries",
    categoryID: 6,
    budgetID: 4,
    amount: 250.0,
    date: "2024-11-03",
    transactionType: "Expense",
    recurrenceFrequency: "WEEKLY",
    recurrenceStartDate: "2024-11-03",
    recurrenceEndDate: "2024-12-31",
  },
  {
    transactionID: 7,
    title: "Electricity Bill",
    categoryID: 7,
    budgetID: 5,
    amount: 100.0,
    date: "2024-11-10",
    transactionType: "Expense",
    recurrenceFrequency: "MONTHLY",
    recurrenceStartDate: "2024-11-10",
    recurrenceEndDate: null,
  },
  {
    transactionID: 8,
    title: "Internet Subscription",
    categoryID: 8,
    budgetID: 5,
    amount: 60.0,
    date: "2024-11-01",
    transactionType: "Expense",
    recurrenceFrequency: "MONTHLY",
    recurrenceStartDate: "2024-11-01",
    recurrenceEndDate: null,
  },
  {
    transactionID: 9,
    title: "Gym Membership",
    categoryID: 9,
    budgetID: 4,
    amount: 45.0,
    date: "2024-11-15",
    transactionType: "Expense",
    recurrenceFrequency: "YEARLY",
    recurrenceStartDate: "2024-11-15",
    recurrenceEndDate: "2025-11-15",
  },
  {
    transactionID: 10,
    title: "Car Maintenance",
    categoryID: 10,
    budgetID: 6,
    amount: 500.0,
    date: "2024-11-15",
    transactionType: "Expense",
    recurrenceFrequency: null,
    recurrenceStartDate: null,
    recurrenceEndDate: null,
  },
];

const Transactions = ({ budget, goals }) => {
  const sortTransactionsByDate = (transactions) => {
    let sortedTransactions = [];
    let transactionDateMap = {};

    for (let t of transactions) {
      if (t.date in transactionDateMap) {
        transactionDateMap[t.date].push(t);
      } else {
        transactionDateMap[t.date] = [t];
      }
    }

    const sortedDateKeys = Object.keys(transactionDateMap).sort((a, b) => new Date(b) - new Date(a));
    // Loop through the sorted keys and push the corresponding values into the array
    sortedDateKeys.forEach((key) => {
      sortedTransactions.push(transactionDateMap[key]);
    });

    return sortedTransactions;
  };
  return (
    <Grid container spacing={2} sx={{ marginBottom: 5 }}>
      <Grid size={2} sx={{}}></Grid>
      <Grid
        container
        size={8}
        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={12}>
          <MonthPicker startDate={budget.creationDate} handleSubmit={() => alert("HELLO")} />
        </Grid>

        <Grid container spacing={6} size={12}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <Typography variant="heading4" sx={{ fontWeight: "bold" }}>
                Income
              </Typography>
            </Box>

            {sortTransactionsByDate(INCOME_TRANSACTIONS).map((t, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" sx={{ marginTop: 2, fontWeight: "bold" }}>
                  {t[0].date}
                </Typography>
                <TransactionGroup type="Income" transactions={t} handleClick={() => alert("hello")} />
              </Box>
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <Typography variant="heading4" sx={{ fontWeight: "bold" }}>
                Expense
              </Typography>
            </Box>
            {sortTransactionsByDate(EXPENSE_TRANSACTIONS).map((t, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" sx={{ marginTop: 2, fontWeight: "bold" }}>
                  {t[0].date}
                </Typography>
                <TransactionGroup type="Expense" transactions={t} handleClick={() => alert("hello")} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid size={2} sx={{}}></Grid>
    </Grid>
  );
};

export default Transactions;
