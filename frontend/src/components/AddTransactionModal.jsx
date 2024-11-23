import React, { useState } from "react";
import {
	Modal,
	TextField,
	Box,
	Button,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	InputAdornment,
	IconButton,
	OutlinedInput,
	Grid2 as Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import customAxiosInstance from "../utils/customAxiosInstance";

const USERS = ["User 1", "User 2", "User 3"];

const AddTransactionModal = ({ showModal, setShowModal, budgetID, categories, updateCurrentBudget }) => {
	const [type, setType] = useState("Expense");
	const [recurring, setRecurring] = useState("No");
	const [category, setCategory] = useState();
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState();
	const [date, setDate] = useState();
	const [user, setUser] = useState("User 1");
	const [users, setUsers] = useState(["User 1"]);

	const [recurrenceStartDate, setRecurrenceStartDate] = useState(null);
	const [recurrenceEndDate, setRecurrenceEndDate] = useState(null);
	const [recurrenceFrequency, setRecurrenceFrequency] = useState(null);

	const handleSubmit = async () => {
		try {
			const res = await customAxiosInstance.post(
				`/budget/${budgetID}/transaction`,
				{
					title,
					categoryID: category,
					amount,
					date,
					transactionType: type,
					recurrenceFrequency,
					recurrenceStartDate,
					recurrenceEndDate,
				}
			);
			updateCurrentBudget();
		} catch (err) {
			console.log(err?.response?.data?.error || err.message);
		}
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
					marginTop: 10,
				}}
			>
				<Grid container spacing={0} sx={{ minHeight: "600px" }}>
					<Grid size={1}></Grid>
					<Grid
						size={10}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
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
							<Grid
								container
								spacing={2}
								sx={{ marginTop: 3, width: "100%" }}
							>
								<Grid
									size={6}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<FormControl
										sx={{ width: "100%" }}
										size="small"
									>
										<InputLabel id="type-select-label">
											Type
										</InputLabel>
										<Select
											labelId="type-select-label"
											id="type-select"
											value={type}
											label="Type"
											sx={{
												borderRadius: 16,
												boxShadow:
													"0px 4px 8px rgba(0, 0, 0, 0.3)",
											}}
											onChange={(e) =>
												setType(e.target.value)
											}
										>
											<MenuItem value="Expense">
												Expense
											</MenuItem>
											<MenuItem value="Income">
												Income
											</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid
									size={6}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<FormControl
										sx={{ width: "100%" }}
										size="small"
									>
										<InputLabel id="recurring-select-label">
											Recurring
										</InputLabel>
										<Select
											labelId="recurring-select-label"
											id="recurring-select"
											value={recurring}
											label="Recurring"
											sx={{
												borderRadius: 16,
												boxShadow:
													"0px 4px 8px rgba(0, 0, 0, 0.3)",
											}}
											onChange={(e) =>
												setRecurring(e.target.value)
											}
										>
											<MenuItem value="No">No</MenuItem>
											<MenuItem value="Yes">Yes</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>

              {recurring === "Yes" && (
            <>
              <Grid container spacing={2} sx={{ marginTop: 3, width: "100%" }}>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel id="recurrence-frequency-label">Frequency</InputLabel>
                    <Select
                      labelId="recurrence-frequency-label"
                      id="recurrence-frequency"
                      value={recurrenceFrequency}
                      label="Frequency"
                      onChange={(e) => setRecurrenceFrequency(e.target.value)}
                      size="small"
                      sx={{ borderRadius: 16, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
                    >
                      <MenuItem value="DAILY">Daily</MenuItem>
                      <MenuItem value="WEEKLY">Weekly</MenuItem>
                      <MenuItem value="BI-WEEKLY">Bi-Weekly</MenuItem>
                      <MenuItem value="MONTHLY">Monthly</MenuItem>
                      <MenuItem value="YEARLY">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={recurrenceStartDate}
                      onChange={(newValue) => setRecurrenceStartDate(newValue)}
                      slotProps={{
                        textField: {
                          size: "small",
                          InputProps: {
                            sx: { borderRadius: 16, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }, // Apply the styles here
                          },
                        },
                      }}
                      sx={{ borderRadius: 16, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginTop: 3, width: "100%" }}>
                <Grid size={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={recurrenceEndDate}
                      onChange={(newValue) => setRecurrenceEndDate(newValue)}
                      slotProps={{
                        textField: {
                          size: "small",
                          InputProps: {
                            sx: { borderRadius: 16, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }, // Apply the styles here
                          },
                        },
                      }}
                      sx={{ borderRadius: 16, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </>
          )}

							<Grid
								container
								spacing={2}
								sx={{ marginTop: 3, width: "100%" }}
							>
								<Grid size={6}>
									<FormControl fullWidth>
										<InputLabel htmlFor="amount">
											Amount
										</InputLabel>
										<OutlinedInput
											id="amount"
											placeholder="0.00"
											value={amount}
											onChange={(e) =>
												setAmount(e.target.value)
											}
											startAdornment={
												<InputAdornment position="start">
													$
												</InputAdornment>
											}
											label="Amount"
											size="small"
											sx={{
												borderRadius: 16,
												boxShadow:
													"0px 4px 8px rgba(0, 0, 0, 0.3)",
											}}
										/>
									</FormControl>
								</Grid>
								<Grid size={6}>
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
									>
										<DatePicker
											label="Date"
											value={date}
											onChange={(newValue) =>
												setDate(newValue)
											}
											slotProps={{
												textField: {
													size: "small",
													InputProps: {
														sx: {
															borderRadius: 16,
															boxShadow:
																"0px 4px 8px rgba(0, 0, 0, 0.3)",
														}, // Apply the styles here
													},
												},
											}}
											sx={{
												borderRadius: 16,
												boxShadow:
													"0px 4px 8px rgba(0, 0, 0, 0.3)",
											}}
										/>
									</LocalizationProvider>
								</Grid>
							</Grid>

							<Grid
								container
								spacing={0}
								sx={{ marginTop: 3, width: "100%" }}
							>
								<Grid size={12}>
									<FormControl
										sx={{ width: "100%" }}
										size="small"
									>
										<InputLabel id="category-select-label">
											Category
										</InputLabel>
										<Select
											labelId="category-select-label"
											id="category-select"
											value={category}
											label="Category"
											sx={{
												borderRadius: 16,
												boxShadow:
													"0px 4px 8px rgba(0, 0, 0, 0.3)",
											}}
											onChange={(e) =>
												setCategory(e.target.value)
											}
										>
                      {categories.map((c) => (
                        <MenuItem key={c.categoryID} value={c.categoryID}>
                          {c.name}
                        </MenuItem>
                      ))}
										</Select>
									</FormControl>
								</Grid>
							</Grid>

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
									boxShadow:
										"inset 0px 4px 8px rgba(0, 0, 0, 0.3)", // Root class for the input field
									"& .MuiOutlinedInput-root": {
										borderRadius: 16,
									},
								}}
							/>

							<Grid
								container
								spacing={0}
								sx={{
									marginTop: 3,
									width: "100%",
									background: "transparent",
								}}
							>
								<Grid size={12}>
									<FormControl
										sx={{ width: "100%" }}
										size="small"
									>
										<InputLabel id="users-select-label">
											Users
										</InputLabel>
										<Select
											labelId="users-select-label"
											id="users-select"
											value={user}
											label="Users"
											sx={{
												borderRadius: 16,
												boxShadow:
													"0px 4px 8px rgba(0, 0, 0, 0.3)",
											}}
											onChange={(e) => {
												setUser(e.target.value);
												if (
													!users.includes(
														e.target.value
													)
												) {
													setUsers([
														...users,
														e.target.value,
													]);
												}
											}}
										>
											{USERS.map((u, i) => (
												<MenuItem key={i} value={u}>
													{u}
												</MenuItem>
											))}
										</Select>
									</FormControl>

									<Paper
										elevation={3}
										sx={{ borderRadius: 10, marginTop: 3 }}
									>
										<List>
											{users.map((user, idx) => (
												<ListItem
													key={idx}
													secondaryAction={
														<IconButton
															edge="end"
															aria-label="delete"
															onClick={() => {
																setUsers(
																	users.filter(
																		(u) =>
																			u !==
																			user
																	)
																);
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
													<ListItemText
														primary={user}
													/>
												</ListItem>
											))}
										</List>
									</Paper>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={0}
								sx={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Grid size={6}></Grid>
								<Grid
									size={6}
									sx={{
										width: "100%",
										display: "flex",
										justifyContent: "flex-end",
										alignItems: "center",
									}}
								>
									<Button
										variant="contained"
										fullWidth={false}
										style={{ backgroundColor: "#7459D9" }}
										onClick={handleSubmit}
									>
										Add Transaction
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

export default AddTransactionModal;
