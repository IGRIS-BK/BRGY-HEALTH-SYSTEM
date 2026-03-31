import type { ReactNode } from "react";
import { LayoutDashboard, Users, HeartPulse, Bell } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">

      <div className="flex h-full rounded-3xl overflow-hidden shadow-2xl bg-white">

        {/* 🔹 SIDEBAR */}
        <aside className="w-20 bg-gradient-to-b from-purple-700 to-indigo-600 flex flex-col items-center py-6 gap-6 text-white">

          <LayoutDashboard className="cursor-pointer hover:scale-110 transition" />
          <Users className="cursor-pointer hover:scale-110 transition" />
          <HeartPulse className="cursor-pointer hover:scale-110 transition" />

        </aside>

        {/* 🔹 MAIN CONTENT */}
        <div className="flex-1 flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4">

            <h1 className="text-xl font-bold">Dashboard</h1>

            <div className="flex items-center gap-4">
              <input
                placeholder="Search"
                className="px-4 py-2 rounded-full bg-gray-100 text-sm outline-none"
              />
              <Bell className="text-gray-500" />
              <div className="w-8 h-8 bg-purple-600 rounded-full" />
            </div>

          </div>

          {/* CONTENT */}
          <div className="flex flex-1 gap-6 px-6 pb-6 overflow-hidden">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}