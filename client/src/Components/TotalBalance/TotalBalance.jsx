import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const TotalBalance = ({transactions, currency}) => {
  const [month, setMont] = useState(new Date().getMonth()+1)

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
        hoverOffset: 4
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
          </div>
          <Pie data={data} />
        </>
      )}
    </div>
  )
}

export default TotalBalance




