import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import NotFound from "./Pages/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Overview from "./Pages/Overview/Overview";
import Earnings from "./Pages/Earnings/Earnings";
import Expenses from "./Pages/Expenses/Expenses";
import Profile from "./Pages/Profile/Profile";
import CreateTransactions from "./Pages/CreateTransactions/CreateTransactions";

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/earnings"
          element={
            <ProtectedRoute>
              <Earnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createTransaction"
          element={
            <ProtectedRoute>
              <CreateTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
