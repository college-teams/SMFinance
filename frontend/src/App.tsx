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
import CreateLoan from "./pages/Loan/CreateLoan";
import EditLoan from "./pages/Loan/EditLoan";
import SaveCustomer from "./pages/Customer/SaveCustomer";

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

              <Route path="customers">
                <Route index element={<CustomerList />} />
                <Route path="create" element={<SaveCustomer />} />
                <Route path=":customerId" element={<SaveCustomer />} />
              </Route>

              <Route path="loans">
                <Route index element={<LoanList />} />
                <Route path="create" element={<CreateLoan />} />
                <Route path=":loanId" element={<EditLoan />} />
              </Route>

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
