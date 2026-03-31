import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex gap-6">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col gap-6">
          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <p className="text-sm text-gray-500">Total Residents</p>
              <h2 className="text-3xl font-bold text-purple-600">252</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <p className="text-sm text-gray-500">Vaccinated</p>
              <h2 className="text-3xl font-bold text-indigo-600">110+</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <p className="text-sm text-gray-500">Health Records</p>
              <h2 className="text-3xl font-bold text-blue-600">255</h2>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h2 className="font-semibold text-gray-700 mb-4">Residents</h2>

            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-center">Age</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3">Juan Dela Cruz</td>
                  <td className="text-center">45</td>
                  <td className="text-center text-green-500 font-medium">
                    Active
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3">Maria Santos</td>
                  <td className="text-center">60</td>
                  <td className="text-center text-yellow-500 font-medium">
                    Senior
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 space-y-4">
          <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow">
            <h2 className="font-semibold">Health Meeting</h2>
            <p className="text-xs opacity-80">Barangay Health Program</p>
          </div>

          <div className="bg-red-400 text-white p-4 rounded-2xl shadow">
            Vaccination 75%
          </div>

          <div className="bg-purple-500 text-white p-4 rounded-2xl shadow">
            Residents 95%
          </div>

          <div className="bg-blue-400 text-white p-4 rounded-2xl shadow">
            Records 90%
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
