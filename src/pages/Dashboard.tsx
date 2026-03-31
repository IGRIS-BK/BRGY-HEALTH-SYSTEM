
export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          DATA OVERVIEW
        </h1>
        <p className="text-sm text-gray-500">
          Centralized view of barangay health and population data.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* TOTAL RESIDENTS */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-xs text-gray-500">Total Residents</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            1,245
          </h2>
        </div>

        {/* SENIOR CITIZENS */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-xs text-gray-500">Senior Citizens</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            210
          </h2>
        </div>

        {/* CHILDREN */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-xs text-gray-500">Children</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            340
          </h2>
        </div>

        {/* HEALTH RECORDS */}
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-xs text-gray-500">Health Records</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            890
          </h2>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Recent Activity
        </h3>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>✔ New resident registered</li>
          <li>✔ Health record updated</li>
          <li>✔ Vaccination record added</li>
        </ul>
      </div>

    </div>
  );
}
