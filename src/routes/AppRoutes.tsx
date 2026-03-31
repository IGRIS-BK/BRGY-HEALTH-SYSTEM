import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Residents from "../pages/Residents";

export default function AppRoutes() {
  return (
    <Routes> {/* ✅ REQUIRED */}

      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="residents" element={<Residents />} />
      </Route>

      <Route path="/residents" element={<Navigate to="/dashboard/residents" />} />

    </Routes>
  );
}