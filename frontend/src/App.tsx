import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import React from "react";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./components/DashboardHome";
import Transactions from "./pages/Transactions";
import PrivateRoute from "./utils/PrivateRoute";
import LoanList from "./pages/Loan/LoanList";
import CustomerList from "./pages/Customer/CustomerList";
import Revenue from "./pages/Revenue";
import Reports from "./pages/Reports";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>

          <Route path="/">
            <Route index element={<Login />} />

            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="loans" element={<LoanList />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace={true} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
