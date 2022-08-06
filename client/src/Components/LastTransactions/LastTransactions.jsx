import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row, currency } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography component="span">
            {new Intl.NumberFormat().format(row.amount)}
          </Typography>
          <Typography
            sx={{ fontWeight: "bold", marginLeft: "5px" }}
            component="span"
          >
            {currency}
          </Typography>
        </TableCell>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Concept</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.concept}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     amount: PropTypes.number.isRequired,
//     category: PropTypes.number.isRequired,
//     type: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         concept: PropTypes.number.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

const LastTransactions = ({ transactions, currency }) => {
  const rows = transactions.map(
    ({ amount, category, type, id, concept, date }) => {
      return {
        id,
        amount,
        category,
        type,
        concept,
        date,
      };
    }
  );

  return (
    <>
      <h2>Last Transactions </h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} currency={currency} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default LastTransactions;
