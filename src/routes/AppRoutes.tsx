import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Residents from "../pages/Residents";
import HealthRecords from "../pages/HealthRecords";
import Pregnancies from "../pages/Pregnancies";

export default function AppRoutes() {
  return (
    <Routes>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* DASHBOARD LAYOUT */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* /dashboard */}
        <Route index element={<Dashboard />} />

        {/* /dashboard/residents */}
        <Route path="residents" element={<Residents />} />

        {/* /dashboard/health-records */}
        <Route path="health-records" element={<HealthRecords />} />

        {/* /dashboard/pregnancies */}
        <Route path="pregnancies" element={<Pregnancies />} />
      </Route>

      {/* OPTIONAL REDIRECTS */}
      <Route path="/residents" element={<Navigate to="/dashboard/residents" />} />
      <Route path="/health-records" element={<Navigate to="/dashboard/health-records" />} />

    </Routes>
  );
}