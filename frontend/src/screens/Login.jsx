import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, TextField, Button, Box, Link, Paper, Grid2 as Grid } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeScreen = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", { email, password });
      // localStorage.setItem("jwt-token", res.data.token);
      changeScreen("/home");
    }
    catch (err) {
      console.log(err.message);
      console.log(err.response?.data?.error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={0} sx={{ position: "relative"}}>
        <Grid size={8} sx={{ backgroundColor: "#F2F2F7", height: "100vh"}}></Grid>
        <Grid size={4} sx={{ height: "100vh"}}></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ position: "absolute", top:0, left:0, zIndex: 3, height: "100vh", width: "100vw", justifyContent: "center"}}>
        <Grid size={1}></Grid>
        <Grid size={5} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Paper elevation={0} sx={{background: "transparent"}}>
          <h1 style={{color: "#7459D9" , fontSize: "2rem", fontWeight: "bold", textAlign:"left"}}>BudgetBuddy</h1>
          <div style={{width: "80%"}}>
            <p style={{textAlign:"left", color: "#6c757d", marginTop: "10px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
         
          </Paper>
        </Grid>
        <Grid size={4} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Paper elevation={3} sx={{height: "350px", width: "100%", borderRadius:8}}>
             {/* Form Container */}
            <Box
              style={{  padding:"20px", paddingTop: "10px",}}
              sx={{
                height: "100%",
                display:"flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "flex-end"
              }}
            >
              {/* Email Input */}
              <TextField
                fullWidth
                label=""
                variant="standard"
                margin="normal"
                placeholder="Email"
                size="medium"
                inputProps={{
                  style: { paddingLeft:"15px", padding: "10px"},
                }}
                sx={{height: "12%", borderRadius: "16px", boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)"}}
                InputProps={{disableUnderline: true}}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Input */}
              <TextField
                fullWidth
                type="password"
                label=""
                variant="standard"
                margin="normal"
                placeholder="Password"
                size="medium"
                inputProps={{
                  style: { paddingLeft:"15px", padding: "10px"},
                }}
                sx={{height: "12%", borderRadius: "16px", boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)"}}
                InputProps={{disableUnderline: true}}
                onChange={(e) => setPassword(e.target.value)}
              />
          
              {/* Google Sign-In Button */}
              {/* <Button
                fullWidth
                variant="outlined"
                // startIcon={<GoogleIcon />}
                sx={{ marginTop: 2, borderColor: '#4285F4', color: '#4285F4' }}
              >
                Sign in with Google
              </Button> */}

              {/* Sign Up Button */}
              {/* <ThemeProvider theme={theme}> */}
              <Button
                variant="contained"
                fullWidth={false}
                style={{backgroundColor:  "#7459D9", width: "120px"}}
                onClick={handleLogin}
              >
                Login
              </Button>
              {/* </ThemeProvider> */}

              {/* Sign In Link */}
              <Box sx={{ textAlign: 'center'}}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link href="/" color="primary">
                    Sign-up instead
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid size={2}></Grid>
      </Grid>
    </Box>

  );
};

export default Login;
