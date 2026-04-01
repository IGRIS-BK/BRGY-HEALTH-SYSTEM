type Resident = {
  id: string;
  first_name: string;
  middle_initial: string | null;
  last_name: string;
  birthdate: string;
  sex: string | null;
  contact_number: string | null;
  created_at: string;
};

type Props = {
  residents: Resident[];
  loading: boolean;
  getAge: (birthdate: string) => number;
  onEdit: (resident: Resident) => void;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ResidentsTable({ residents, loading, getAge, onEdit }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      {loading ? (
        <p className="p-6 text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            {/* ✅ HEADER */}
            <thead>
              <tr>
                <th className="text-left px-4 py-3">Full Name</th>
                <th className="text-center px-4 py-3">Age</th>
                <th className="text-center px-4 py-3">Sex</th>
                <th className="text-center px-4 py-3">Contact</th>
                <th className="text-center px-4 py-3">Created At</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>

            {/* ✅ BODY */}
            <tbody>
              {residents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No residents found
                  </td>
                </tr>
              ) : (
                residents.map((r, index) => (
                  <tr
                    key={r.id}
                    className={`
                      cursor-pointer transition
                      ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      hover:bg-red-50
                    `}
                  >
                    {/* FULL NAME */}
                    <td className="px-4 py-3 border-b text-gray-700">
                      {r.first_name}{" "}
                      {r.middle_initial ? r.middle_initial + "." : ""}{" "}
                      {r.last_name}
                    </td>

                    {/* AGE */}
                    <td className="text-center px-4 py-3 border-b">
                      {getAge(r.birthdate)}
                    </td>

                    {/* SEX */}
                    <td className="text-center px-4 py-3 border-b">
                      {r.sex || "-"}
                    </td>

                    {/* CONTACT */}
                    <td className="text-center px-4 py-3 border-b">
                      {r.contact_number || "-"}
                    </td>

                    {/* CREATED AT */}
                    <td className="text-center px-4 py-3 border-b text-gray-600 text-xs">
                      {formatDate(r.created_at)}
                    </td>

                    <td className="text-center px-4 py-3 border-b">
                      <button
                        onClick={() => onEdit(r)}
                        className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
