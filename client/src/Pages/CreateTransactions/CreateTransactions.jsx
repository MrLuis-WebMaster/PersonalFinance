import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { WarningAlert, InfoAlert } from "../../Components/Alert/AlertMessage";
import Dashboard from "../../Components/Dashboard/Dashboard";
import { getCategories } from "../../Redux/slices/category/category";
import {
  sendEarning,
  sendExpense,
} from "../../Redux/slices/transactions/transactions";
import { getUser, resetUser } from "../../Redux/slices/users/users";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CreateTransactions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector(({ categories }) => categories.categories);
  const auth = getAuth();
  const user = useSelector((state) => state.users.infoUser.userInfo);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(getUser(currentUser));
      } else {
        dispatch(resetUser());
      }
    });
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  const [informationTransaction, setinformationTransaction] = useState({
    concept: "",
    amount: "",
    date: "",
    type: "",
    category: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { amount, concept, date, type, category } = informationTransaction;
    for (const property in informationTransaction) {
      if (!informationTransaction[property]) {
        WarningAlert.fire({
          title: `Required field ${property}`,
        });
        break;
      }
    }

    if (!amount || !concept || !date || !type || !category) return;

    if (type === "Earning" && category) {
      dispatch(sendEarning(informationTransaction, user.id));
      setinformationTransaction({
        concept: "",
        amount: "",
        date: "",
        type: "",
        category: "",
      });
      InfoAlert.fire({
        title: "Created Sucess",
      });
      return;
    }
    if (type === "Expense" && category) {
      dispatch(sendExpense(informationTransaction, user.id));
      setinformationTransaction({
        concept: "",
        amount: "",
        date: "",
        type: "",
        category: "",
      });
      InfoAlert.fire({
        title: "Created Sucess",
      });
      return;
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setinformationTransaction({ ...informationTransaction, [name]: value });
  };

  return (
    <>
      <Dashboard
        Component={
          <Grid container component="main" sx={{ height: "100%" }}>
            <Grid item xs={12} sm={8} md={12} elevation={6} square="true">
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Create Transaction
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Concept"
                    label="Concept"
                    name="concept"
                    autoComplete="Concept"
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={informationTransaction.concept}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="amount"
                    label="Amount"
                    type="number"
                    id="Amount"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={informationTransaction.amount}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Date"
                    name="date"
                    type="date"
                    id="Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={informationTransaction.date}
                    onChange={handleChange}
                  />
                  <FormControl fullWidth required sx={{ marginTop: "20px" }}>
                    <InputLabel>Transaction</InputLabel>
                    <Select
                      id="outlined-select-type"
                      value={
                        informationTransaction.type
                          ? informationTransaction.type
                          : ""
                      }
                      label="Transaction"
                      fullWidth
                      name="type"
                      onChange={handleChange}
                    >
                      <MenuItem value="Earning">Earning</MenuItem>
                      <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth required sx={{ marginTop: "20px" }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      id="outlined-select-category"
                      defaultValue="choose"
                      value={
                        informationTransaction
                          ? informationTransaction.category
                          : ""
                      }
                      label="Category"
                      name="category"
                      onChange={handleChange}
                      fullWidth
                    >
                      <MenuItem disabled value="choose">
                        Choose category{" "}
                      </MenuItem>

                      {categories && informationTransaction.type === "Earning"
                        ? categories.map((option) => {
                          if (option.type === "Earning") {
                            return (
                              <MenuItem
                                key={option.id}
                                value={option.name || ""}
                              >
                                {option.name}
                              </MenuItem>
                            );
                          }
                        })
                        : categories &&
                          informationTransaction.type === "Expense"
                          ? categories.map((option) => {
                            if (option.type === "Expense") {
                              return (
                                <MenuItem
                                  key={option.id}
                                  value={option.name || ""}
                                >
                                  {option.name}
                                </MenuItem>
                              );
                            }
                          })
                          : null}
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        }
      ></Dashboard>
    </>
  );
};

export default CreateTransactions;
