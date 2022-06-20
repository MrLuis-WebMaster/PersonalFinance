import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {Box} from '@mui/material'
ChartJS.register(ArcElement, Tooltip, Legend);



const TotalBalance = ({transactions, currency}) => {
  const [month, setMont] = useState(new Date().getMonth()+1)
  const [monthArray, setMothArray] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])

  let operationEarning;
  let operationExpense;

  if (transactions) {
    operationEarning = transactions.filter( e => new Date(e.date).getMonth() + 1  === month && e.type === "Earning").reduce( (a,b) => a + Number(b.amount), 0)
    operationExpense = transactions.filter( e => new Date(e.date).getMonth() + 1  === month && e.type === "Expense").reduce( (a,b) => a + Number(b.amount), 0)
  }

  const data = {
    labels: ['Earnings', 'Expenses'],
    datasets: [
      {
        data: [operationEarning,operationExpense],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)'
  
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 0      
      },
    ],
    rotation:0
  };

  return (
    <div>
      { transactions && currency && (
        <>
          <div>
              <h1>
                  Total Balance : { new Intl.NumberFormat().format(operationEarning-operationExpense) } {currency}
              </h1>
              <h2>
                   Month : { monthArray[month-1]}
              </h2>
          </div>
          <Box sx={{width:'650px', margin:'0 auto'}}>
            <Pie data={data} />
          </Box>
        </>
      )}
    </div>
  )
}

export default TotalBalance




