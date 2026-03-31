import { useState } from "react";
import { Bell, PanelLeft } from "lucide-react";
import { Outlet } from "react-router-dom";

import AppSidebar from "../components/common/AppSidebar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-200">

      <AppSidebar collapsed={collapsed} />

      <div className="flex flex-1 flex-col bg-[#f7f7fb]">

        {/* HEADER */}
        <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              <PanelLeft />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Barangay Health & Welfare System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-full border bg-slate-50 px-4 py-2 text-sm outline-none"
            />

            <button className="relative rounded-full border p-2 hover:bg-slate-50">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            <div className="h-9 w-9 rounded-full bg-violet-600" />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* ✅ THIS FIXES THE ERROR */}
          </div>
        </main>

      </div>
    </div>
  );
}