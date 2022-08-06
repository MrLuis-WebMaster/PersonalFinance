import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { alpha } from "@mui/material/styles";
import {
  deleteTransactions,
  sendUpdateEarning,
  sendUpdateExpense,
} from "../../../Redux/slices/transactions/transactions";
import { InfoAlert } from "../../../Components/Alert/AlertMessage";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Box, Select, MenuItem, TextField } from "@mui/material";
import { getCategories } from "../../../Redux/slices/category/category";

const EnhancedTableToolbar = (props) => {
  const { numSelected, transactions } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickDelete = async () => {
    await dispatch(deleteTransactions(transactions));
    await InfoAlert.fire({
      title: "Delete Succes",
      icon: "info",
    });
    window.location.reload(false);
  };

  const handleClickEdit = () => {
    setOpen((prevState) => !prevState);
  };

  const categories = useSelector(({ categories }) => categories.categories);

  const [informationTransaction, setinformationTransaction] = useState({
    id: "",
    concept: "",
    amount: "",
    date: "",
    type: "",
    category: "",
  });

  useEffect(() => {
    dispatch(getCategories());
    if (transactions.length > 0) {
      setinformationTransaction({
        id: transactions[0].id,
        concept: transactions[0].concept,
        amount: transactions[0].amount,
        date: transactions[0].date,
        type: transactions[0].type,
        category: transactions[0].category,
      });
    }
  }, [transactions]);

  const handleChange = ({ target: { name, value } }) => {
    setinformationTransaction({ ...informationTransaction, [name]: value });
  };

  const handleSubmit = async () => {
    setOpen((prevState) => !prevState);
    if (informationTransaction.type === "Earning") {
      await dispatch(sendUpdateEarning(informationTransaction));
      await InfoAlert.fire({
        title: "Update Succes",
        icon: "info",
      });
      window.location.reload(false);
      return;
    }

    if (informationTransaction.type === "Expense") {
      await dispatch(sendUpdateExpense(informationTransaction));
      await InfoAlert.fire({
        title: "Update Succes",
        icon: "info",
      });
      window.location.reload(false);
      return;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClickEdit}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Note: It is not possible to change the type of operation
          </DialogContentText>
          <Grid container component="main" sx={{ height: "100%" }}>
            <Grid item xs={12} sm={8} md={12} elevation={6} square="true">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box component="form" noValidate sx={{ mt: 1 }}>
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
                    id="outlined-select-category"
                    value={
                      informationTransaction.category
                        ? informationTransaction.category
                        : ""
                    }
                    name="category"
                    onChange={handleChange}
                    sx={{
                      width: "100%",
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
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickEdit}>Cancel</Button>
          <Button onClick={handleSubmit}>send</Button>
        </DialogActions>
      </Dialog>

      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {props.title}
          </Typography>
        )}

        {numSelected === 1 ? (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={handleClickEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleClickDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleClickDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  );
};

export default EnhancedTableToolbar;
