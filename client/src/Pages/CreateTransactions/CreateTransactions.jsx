import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MenuItem, Select } from "@mui/material";
import { ErrorAlert } from "../../Components/Alert/AlertMessage";
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
  console.log(user);
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

    if (informationTransaction.type === "Earning") {
      dispatch(sendEarning(informationTransaction, user.id));
      setinformationTransaction({
        concept: "",
        amount: "",
        date: "",
        type: "",
        category: "",
      });
      return;
    }
    if (informationTransaction.type === "Expense") {
      dispatch(sendExpense(informationTransaction, user.id));
      setinformationTransaction({
        concept: "",
        amount: "",
        date: "",
        type: "",
        category: "",
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
                    value={informationTransaction.amount}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="date"
                    type="date"
                    id="Date"
                    value={informationTransaction.date}
                    onChange={handleChange}
                  />
                  <Select
                    id="outlined-select-type"
                    value={
                      informationTransaction.type
                        ? informationTransaction.type
                        : ""
                    }
                    name="type"
                    onChange={handleChange}
                    sx={{
                      width: "50%",
                    }}
                  >
                    <MenuItem value="Earning">Earning</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                  </Select>

                  <Select
                    id="outlined-select-category"
                    value={
                      informationTransaction.category
                        ? informationTransaction.category
                        : ""
                    }
                    name="category"
                    onChange={handleChange}
                    sx={{
                      width: "50%",
                    }}
                  >
                    {informationTransaction.type === "Earning"
                      ? categories.map((option) => {
                          if (option.type === "Earning") {
                            return (
                              <MenuItem key={option.id} value={option.name}>
                                {option.name}
                              </MenuItem>
                            );
                          }
                        })
                      : informationTransaction.type === "Expense"
                      ? categories.map((option) => {
                          if (option.type === "Expense") {
                            return (
                              <MenuItem key={option.id} value={option.name}>
                                {option.name}
                              </MenuItem>
                            );
                          }
                        })
                      : null}
                  </Select>
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
