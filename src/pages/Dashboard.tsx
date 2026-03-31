import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>

      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col gap-6">

        {/* 🔹 STATS */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-gray-100 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-purple-600">252</h2>
            <p className="text-sm text-gray-500">Total Residents</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-purple-600">110+</h2>
            <p className="text-sm text-gray-500">Vaccinated</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-purple-600">255</h2>
            <p className="text-sm text-gray-500">Health Records</p>
          </div>

        </div>

        {/* 🔹 TABLE */}
        <div className="bg-white rounded-2xl shadow p-4 flex-1 overflow-auto">

          <h2 className="font-semibold mb-4">Residents</h2>

          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Name</th>
                <th>Age</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-2">Juan Dela Cruz</td>
                <td>45</td>
                <td className="text-green-500">Active</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">Maria Santos</td>
                <td>60</td>
                <td className="text-yellow-500">Senior</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="w-72 flex flex-col gap-4">

        {/* REMINDER */}
        <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold">Health Meeting</h2>
          <p className="text-xs opacity-80">
            Barangay Health Program
          </p>
        </div>

        {/* PROGRESS */}
        <div className="bg-red-400 text-white p-4 rounded-2xl">Vaccination 75%</div>
        <div className="bg-purple-500 text-white p-4 rounded-2xl">Residents 95%</div>
        <div className="bg-blue-400 text-white p-4 rounded-2xl">Records 90%</div>

      </div>

    </DashboardLayout>
  );
}