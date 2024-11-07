import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Grid2 as Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const USERS = ["User 1", "User 2", "User 3"];

const AddUserModal = ({ showModal, setShowModal }) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([...USERS]);

  const handleSubmit = () => {
    console.log(username, users);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
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
              <OutlinedInput
                fullWidth
                label="User"
                margin="normal"
                placeholder="Add by username or email"
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
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="add user"
                      onClick={() => {
                        if (!users.includes(username)) {
                          setUsers([...users, username]);
                        }
                      }}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />

              <Grid container spacing={0} sx={{ marginTop: 3, width: "100%", background: "transparent" }}>
                <Grid size={12}>
                  <Paper elevation={3} sx={{ borderRadius: 10 }}>
                    <List>
                      {users.map((user, idx) => (
                        <ListItem
                          key={idx}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => {
                                setUsers(users.filter((u) => u !== user));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            {/* <Avatar> */}
                            <AccountCircleIcon />
                            {/* </Avatar> */}
                          </ListItemAvatar>
                          <ListItemText primary={user} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={0}
                sx={{ marginTop: 3, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
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
                    Add Users
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

export default AddUserModal;
