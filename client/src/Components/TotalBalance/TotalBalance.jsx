import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import useGetCurrentMonth from "../../Hooks/useGetCurrentMonth";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

ChartJS.register(ArcElement, Tooltip, Legend);
const TotalBalance = ({ transactions, currency }) => {
  const [monthNumber, Month] = useGetCurrentMonth();
  const [operationEarnings, setOperationEarnings] = useState(0);
  const [operationExpenses, setOperationExpenses] = useState(0);
  const [result, setResult] = useState(0);
  const [data, setData] = useState({
    labels: ["Earnings", "Expenses"],
    datasets: [
      {
        data: [operationEarnings, operationExpenses],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        hoverOffset: 0,
      },
    ],
    rotation: 0,
  });
  const operations = () => {
    if (transactions.length > 1 && currency) {
      setOperationEarnings(
        transactions
          .filter(
            (e) =>
              new Date(e.date).getMonth() + 1 === monthNumber &&
              e.type === "Earning"
          )
          .reduce((a, b) => a + Number(b.amount), 0)
      );
      setOperationExpenses(
        transactions
          .filter(
            (e) =>
              new Date(e.date).getMonth() + 1 === monthNumber &&
              e.type === "Expense"
          )
          .reduce((a, b) => a + Number(b.amount), 0)
      );
      setResult(operationEarnings - operationExpenses);
      setData({
        ...data,
        datasets: [
          {
            data: [operationEarnings, operationExpenses],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
            hoverOffset: 0,
          },
        ],
      });
    }
  };
  useEffect(() => {
    operations();
  }, [result, operationEarnings, operationExpenses, transactions]);

  return (
    <>
      {transactions && currency && (
        <>
          <div>
            <Typography
              sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem" } }}
              variant="h3"
              component="h2"
            >
              Total Balance:{" "}
              <span className={result < 0 ? "danger-color-text" : ""}>
                {new Intl.NumberFormat().format(result)} {currency}{" "}
              </span>
              {result < 0 && (
                  <Box component="tooltip" disableFocusListener disableTouchListener title="Your finances are at risk">
                    <ReportProblemIcon sx={{ color: 'rgba(200, 0, 0, 1)' }}/>
                  </Box>
              )}
            </Typography>
            <Typography>Month: {Month}</Typography>
          </div>
          <Box
            sx={{
              display: "flex",
              width: { xs: "295px", sm: "400px" },
              margin: "0 auto",
              paddingBottom: { xs: "3.5rem" },
            }}
          >
            <Pie data={data} redraw={true} />
          </Box>
        </>
      )}
    </>
  );
};

export default TotalBalance;
