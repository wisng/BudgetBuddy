import React from "react";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from '@mui/material';
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Insights = () => {
  return (
<Box sx={{ flexGrow: 1}}>
      <Header/>
      <Navbar/>
      <h1>InsightsPage</h1>
    </Box>
  );
};

export default Insights;
