import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, TextField, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Button, Box, Link, Paper, Grid2 as Grid } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [role, setRole] = useState("Client");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSucessMsg] = useState("");
  const changeScreen = useNavigate();

  const handleRegistration = async (e) => {
    console.log("Registration: User info intaking");
    e.preventDefault();
    if (password !== confirmationPassword) {
      alert("Passwords do not match");
      // setErrorMsg("Passwords do not match");
    }
    else {
      try {
        const res = await axios.post("http://localhost:3000/api/register", { email, name, username, password, role });
        alert(`${res.data.message}, redirecting to login page...`);
        // setSuccessMsg(`${res.data.message}, redirecting to login page...`);

        


        setTimeout(() => {
          changeScreen("/login");
        }, 3000);
      }
      catch (err) {
        console.log(err.message);
        console.log(err.response?.data?.error);
        // setErrorMsg(err.message);
      }
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
          <Paper elevation={3} sx={{height: "auto", width: "100%", borderRadius:8}}>
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
                sx={{height: "10%", borderRadius: "16px", boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)"}}
                InputProps={{disableUnderline: true}}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Name Input */}
              <TextField
                fullWidth
                label=""
                variant="standard"
                margin="normal"
                placeholder="Name"
                size="medium"
                inputProps={{
                  style: { paddingLeft:"15px", padding: "10px"},
                }}
                sx={{height: "10%", borderRadius: "16px", boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)"}}
                InputProps={{disableUnderline: true}}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Username Input */}
              <TextField
                fullWidth
                label=""
                variant="standard"
                margin="normal"
                placeholder="Username"
                size="medium"
                inputProps={{
                  style: { paddingLeft:"15px", padding: "10px"},
                }}
                sx={{height: "10%", borderRadius: "16px", boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)"}}
                InputProps={{disableUnderline: true}}
                onChange={(e) => setUsername(e.target.value)}
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
                sx={{height: "10%", borderRadius: "16px", boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)"}}
                InputProps={{disableUnderline: true}}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Confirmation Password Input */}
              <TextField
                fullWidth
                type="password"
                label=""
                variant="standard"
                margin="normal"
                placeholder="Confirmation Password"
                size="medium"
                inputProps={{
                  style: { paddingLeft:"15px", padding: "10px"},
                }}
                sx={{height: "10%", borderRadius: "16px", boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)"}}
                InputProps={{disableUnderline: true}}
                onChange={(e) => setConfirmationPassword(e.target.value)}
              />

              {/* Role Selection */}
              <FormControl fullWidth>
                <RadioGroup
                  row
                  aria-label="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel value="Client" control={<Radio />} label="Client" />
                  <FormControlLabel value="FinancialAdvisor" control={<Radio />} label="Financial Advisor" />
                </RadioGroup>
              </FormControl>




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
                onClick={handleRegistration}
              >
                Sign Up
              </Button>
              {/* </ThemeProvider> */}

              {/* Sign In Link */}
              <Box sx={{ textAlign: 'center'}}>
                <Typography variant="body2">
                  Have an account?{' '}
                  <Link href="/login" color="primary">
                    Login instead
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

export default Signup;
