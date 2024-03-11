import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import React from "react";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./components/DashboardHome";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="transactions" element={<Transactions />} />
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
