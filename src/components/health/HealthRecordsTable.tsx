export default function HealthRecordsTable({ records, loading }: any) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      {loading ? (
        <p className="p-6 text-gray-500">Loading...</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Resident</th>
              <th className="px-4 py-3 text-center">Visit Date</th>
              <th className="px-4 py-3 text-center">Service</th>
              <th className="px-4 py-3 text-center">Staff</th>
              <th className="px-4 py-3 text-center">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No records found
                </td>
              </tr>
            ) : (
              records.map((r: any) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {r.resident?.first_name} {r.resident?.last_name}
                  </td>

                  <td className="text-center">
                    {formatDate(r.visit_date)}
                  </td>

                  <td className="text-center">{r.service_type}</td>
                  <td className="text-center">{r.staff_name || "-"}</td>
                  <td className="text-center">{r.remarks || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}