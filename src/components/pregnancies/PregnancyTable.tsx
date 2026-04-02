import { Button } from "../ui/button";

type Props = {
  data: any[];
  loading: boolean;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
};

export default function PregnancyTable({
  data,
  loading,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      {loading ? (
        <p className="p-6 text-gray-500">Loading...</p>
      ) : (
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Resident</th>
              <th className="text-center px-4 py-3">Due Date</th>
              <th className="text-center px-4 py-3">Last Checkup</th>
              <th className="text-center px-4 py-3">Risk Level</th>
              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  
                  {/* RESIDENT */}
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {p.resident
                      ? `${p.resident.first_name} ${p.resident.last_name}`
                      : "—"}
                  </td>

                  {/* DUE DATE */}
                  <td className="text-center px-4 py-3">
                    {p.expected_due_date || "-"}
                  </td>

                  {/* LAST CHECKUP */}
                  <td className="text-center px-4 py-3">
                    {p.last_checkup || "-"}
                  </td>

                  {/* RISK LEVEL */}
                  <td className="text-center px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                          p.risk_level === "High"
                            ? "bg-red-100 text-red-600"
                            : p.risk_level === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                    >
                      {p.risk_level || "-"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="text-center px-4 py-3 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}