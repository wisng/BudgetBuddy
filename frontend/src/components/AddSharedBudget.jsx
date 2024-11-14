import React, { useState } from "react";
import {
  Modal,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  Paper,
  InputAdornment,
  OutlinedInput,
  Grid2 as Grid,
} from "@mui/material";

const AddSharedBudgetModal = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();

  const handleSubmit = () => {
    console.log(title, amount);
  };

  return (
    <Modal
      open={showModal}
      sx={{ overflow: "scroll" }}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          background: "transparent",
          outline: 0,
          marginTop: 5,
        }}
      >
        <Grid container spacing={0} sx={{ minHeight: "300px" }}>
          <Grid size={1}></Grid>
          <Grid size={10} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper
              elevation={3}
              style={{ padding: 20, paddingTop: 10 }}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "flex-end",
                width: "100%",
                borderRadius: 8,
              }}
            >
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

              <Grid container spacing={2} sx={{ marginTop: 3, width: "100%" }}>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="amount">Starting Amount</InputLabel>
                    <OutlinedInput
                      id="amount"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Starting Amount"
                      size="small"
                      sx={{ borderRadius: 16, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <Grid size={6}></Grid>
                <Grid
                  size={6}
                  sx={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                >
                  <Button
                    variant="contained"
                    fullWidth={false}
                    style={{ backgroundColor: "#7459D9" }}
                    onClick={handleSubmit}
                  >
                    Add Shared Budget
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid size={1}></Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddSharedBudgetModal;
