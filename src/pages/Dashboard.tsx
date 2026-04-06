import { Users, UserCheck, Baby, FileText } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          BRGY. GASAN HEALTH DATA OVERVIEW
        </h1>
        <p className="text-sm text-gray-500">
          Real-time key performance indicators
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* TOTAL RESIDENTS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Total Residents</p>
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            1,245
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Barangay Population
          </p>
        </div>

        {/* SENIOR CITIZENS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Senior Citizens</p>
            <UserCheck className="w-5 h-5 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            210
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            60+ years old
          </p>
        </div>

        {/* CHILDREN */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Children & Youth</p>
            <Baby className="w-5 h-5 text-pink-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            340
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Ages 0–18
          </p>
        </div>

        {/* HEALTH RECORDS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Health Records</p>
            <FileText className="w-5 h-5 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            890
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Active files
          </p>
        </div>

      </div>

      {/* TRENDS / CHART PLACEHOLDER */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Trends
        </h3>

        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
          Chart / Graph goes here
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Recent Activity
        </h3>

        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex justify-between">
            <span>✔ New resident registered</span>
            <span className="text-gray-400 text-xs">10:15 AM</span>
          </li>
          <li className="flex justify-between">
            <span>✔ Health record updated</span>
            <span className="text-gray-400 text-xs">11:30 AM</span>
          </li>
          <li className="flex justify-between">
            <span>✔ Vaccination record added</span>
            <span className="text-gray-400 text-xs">9:00 AM</span>
          </li>
        </ul>
      </div>

    </div>
  );
}