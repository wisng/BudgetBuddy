import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Paper,
  FormControl,
  OutlinedInput,
  InputLabel,
  IconButton,
  InputAdornment,
  Grid2 as Grid,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [role, setRole] = useState("Client");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSucessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        }, 1000);
      }
      catch (err) {
        console.log(err.message);
        console.log(err.response?.data?.error);
        // setErrorMsg(err.message);
      }
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} sx={{ position: "relative" }}>
        <Grid size={8} sx={{ backgroundColor: "#F2F2F7", height: "100vh" }}></Grid>
        <Grid size={4} sx={{ height: "100vh" }}></Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 3,
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
        }}
      >
        <Grid size={1}></Grid>
        <Grid size={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Paper elevation={0} sx={{ background: "transparent" }}>
            <h1 style={{ color: "#7459D9", fontSize: "2rem", fontWeight: "bold", textAlign: "left" }}>BudgetBuddy</h1>
            <div style={{ width: "80%" }}>
              <p style={{ textAlign: "left", color: "#6c757d", marginTop: "10px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid size={4} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Paper elevation={3} sx={{height: "auto", width: "100%", borderRadius:8}}>
             {/* Form Container */}
            <Box
              style={{ padding: "20px", paddingTop: "10px" }}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "flex-end",
              }}
            >
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{
                  marginTop: 3,
                  borderRadius: 16,
                  boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)", // Root class for the input field
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 16,
                  },
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
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="small"
                sx={{
                  marginTop: 3,
                  borderRadius: 16,
                  boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)", // Root class for the input field
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 16,
                  },
                }}
              />

              <FormControl sx={{ width: "100%", marginTop: 3 }} size="small">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  fullWidth
                  label="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="small"
                  sx={{
                    borderRadius: 16,
                    boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)", // Root class for the input field
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 16,
                    },
                  }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "hide the password" : "display the password"}
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl sx={{ width: "100%", marginTop: 3 }} size="small">
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  fullWidth
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="small"
                  sx={{
                    borderRadius: 16,
                    boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.3)", // Root class for the input field
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 16,
                    },
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showConfirmPassword ? "hide the password" : "display the password"}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
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
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2">
                  Have an account?{" "}
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
