import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, HeartPulse, LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Residents", url: "/dashboard/residents", icon: Users },
  { title: "Health Records", url: "/dashboard/health-records", icon: HeartPulse },
  { title: "Pregnancies", url: "/dashboard/pregnancies", icon: Baby }, // ✅ NEW
];

export default function AppSidebar({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate(); // ✅ FIX

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    navigate("/login"); // ✅ redirect after logout
  };

  return (
    <div
      className={`h-screen flex flex-col justify-between bg-gradient-to-b from-violet-700 to-indigo-600 text-white transition-all duration-300
      ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* TOP */}
      <div>
        {/* HEADER */}
        <div className="px-4 py-5">
          {!collapsed && (
            <>
              <h2 className="text-lg font-bold">BRGY HEALTH</h2>
              <p className="text-xs text-white/70">Welfare System</p>
            </>
          )}
        </div>

        {/* MENU */}
        <nav className="mt-4 space-y-2 px-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 transition
                  hover:bg-white/10
                  ${isActive ? "bg-white/20" : ""}`
                }
              >
                <Icon className="h-5 w-5" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* 🔥 BOTTOM (LOGOUT) */}
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-red-500/20 transition"
        >
          <LogOut className="h-5 w-5 text-red-300" />
          {!collapsed && <span className="text-red-200">Logout</span>}
        </button>
      </div>
    </div>
  );
}