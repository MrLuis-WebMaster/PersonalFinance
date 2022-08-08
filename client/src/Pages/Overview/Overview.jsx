import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Loading from "../../Components/Loading/Loading";
import LastTransactions from "../../Components/LastTransactions/LastTransactions";
import TotalBalance from "../../Components/TotalBalance/TotalBalance";
import Typography from "@mui/material/Typography";
import {
  allTransactions,
  lastTransactions,
} from "../../Redux/slices/transactions/transactions";

import useUser from "../../Hooks/useGetUser";


const Overview = () => {
  const Dispatch = useDispatch();
  const user = useUser();
  const transactions = useSelector(
    (state) => state.transactions.lastTransactions
  );
  const allTransactionsUser = useSelector(
    (state) => state.transactions.allTransactions
  );

  useEffect(() => {
    if (user) {
      Dispatch(lastTransactions(user.id));
      Dispatch(allTransactions(user.id));
    }
  }, [user]);

  if (!user) {
    return <Loading />;
  } else {
    return (
      <>
        <Dashboard
          Component={
            <div>
              <Typography sx={{fontSize:{xs:'1.8rem', sm:'3rem'}}} variant="h3" component="h2">Welcome {user.fullName}</Typography>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                  <LastTransactions
                    currency={user.currency}
                    transactions={transactions}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TotalBalance
                    transactions={allTransactionsUser}
                    currency={user.currency}
                  />
                </Grid>
              </Grid>
            </div>
          }
        />
      </>
    );
  }
};

export default Overview;
