import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Grid2 as Grid,
  ListSubheader,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const TransactionGroup = ({ type, categories, transactions, handleClick }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  let color;
  if (type == "Expense") {
    color = "#EA4335";
  } else {
    color = "#2BDE73";
  }

  const getCategoryIcon = (categoryID, categories) => {
    for (let c of categories) {
      if (c.categoryID === categoryID) {
        return c;
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 10, marginTop: 3, width: "100%" }}>
      <List>
        {transactions.map((t, idx) => {
          let category = getCategoryIcon(t.categoryID, categories);
          console.log(category);
          return (
            <ListItem
              key={idx}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleClick}>
                  <ArrowForwardIosIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                {category ? (
                  <Avatar sx={{ bgcolor: category.colour }}>{category.icon ? category.icon : category.name[0]}</Avatar>
                ) : (
                  <Avatar></Avatar>
                )}
              </ListItemAvatar>
              <ListItemText primary={t.title} secondary={category ? category.name : ""} sx={{ minWidth: "65%" }} />
              <AttachMoneyIcon fontSize="small" />
              <ListItemText primary={t.amount} sx={{ color }} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default TransactionGroup;
