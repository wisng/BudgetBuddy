import React from "react";
import { Button, Grid2 as Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <Grid container spacing={0} sx={{ padding: "10px" }}>
      <Grid size={1} />
      <Grid size={2}>
        <h1 style={{ color: "#7459D9", fontSize: "1.5rem", fontWeight: "bold", textAlign: "left" }}>BudgetBuddy</h1>
      </Grid>
      <Grid size={4} sx={{}}></Grid>
      <Grid size={5} sx={{}}>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            {...(pathname && pathname == "/insights" ? { variant: "contained" } : {})}
            fullWidth={false}
            onClick={() => {
              navigate("/insights");
            }}
            style={
              pathname && pathname == "/insights"
                ? { backgroundColor: "#7459D9", textTransform: "none", fontSize: 16 }
                : { textTransform: "none", fontSize: 16, color: "#7459D9" }
            }
          >
            Insights
          </Button>
          <Button
            {...(pathname && pathname == "/transactions" ? { variant: "contained" } : {})}
            fullWidth={false}
            onClick={() => {
              navigate("/transactions");
            }}
            style={
              pathname && pathname == "/transactions"
                ? { backgroundColor: "#7459D9", textTransform: "none", fontSize: 16 }
                : { textTransform: "none", fontSize: 16, color: "#7459D9" }
            }
          >
            Transactions
          </Button>
          <Button
            {...(pathname && pathname == "/home" ? { variant: "contained" } : {})}
            fullWidth={false}
            onClick={() => {
              console.log(" HELLO");
              navigate("/home");
            }}
            style={
              pathname && pathname == "/home"
                ? { backgroundColor: "#7459D9", textTransform: "none", fontSize: 16 }
                : { textTransform: "none", fontSize: 16, color: "#7459D9" }
            }
          >
            My Budget
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Navbar;
