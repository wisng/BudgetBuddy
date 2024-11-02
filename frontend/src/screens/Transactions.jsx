import React from "react";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from '@mui/material';
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Transactions = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <Header/>
      <Navbar/>
      <h1>Transactions Page</h1>
    </Box>
  );
};

export default Transactions;
