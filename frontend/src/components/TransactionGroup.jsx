import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Grid2 as Grid,
  ListSubheader,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const TransactionGroup = ({ type, transactions, handleClick }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  let color;
  if (type == "Expense") {
    color = "#EA4335";
  } else {
    color = "#2BDE73";
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 10, marginTop: 3, width: "100%" }}>
      <List>
        {transactions.map((t, idx) => (
          <ListItem
            key={idx}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={handleClick}>
                <ArrowForwardIosIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              {/* <Avatar> */}
              <AccountCircleIcon />
              {/* </Avatar> */}
            </ListItemAvatar>
            <ListItemText primary={t.title} secondary="Shopping" sx={{ minWidth: "65%" }} />
            <AttachMoneyIcon fontSize="small" />
            <ListItemText primary={t.amount} sx={{ color }} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TransactionGroup;
