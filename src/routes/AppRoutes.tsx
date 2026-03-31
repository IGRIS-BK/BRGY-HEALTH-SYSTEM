import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Residents from "../pages/Residents";
import HealthRecords from "../pages/HealthRecords";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/residents" element={<Residents />} />
      <Route path="/health" element={<HealthRecords />} />
    </Routes>
  );
}