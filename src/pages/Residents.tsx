import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Resident = {
  id: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  sex: string | null;
};

export default function Residents() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const initialForm = {
    first_name: "",
    middle_initial: "",
    last_name: "",
    birthdate: "",
    sex: "",
    contact_number: "",
  };

  const [form, setForm] = useState(initialForm);

  // FETCH
  const fetchResidents = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("residents")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setResidents(data);
    else console.error(error);

    setLoading(false);
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  // ADD
  const handleAdd = async () => {
    if (!form.first_name || !form.last_name || !form.birthdate) {
      alert("Please fill required fields");
      return;
    }

    const { error } = await supabase.from("residents").insert([
      {
        first_name: form.first_name,
        middle_initial: form.middle_initial || null,
        last_name: form.last_name,
        birthdate: form.birthdate,
        sex: form.sex || null,
        contact_number: form.contact_number || null,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setForm(initialForm);
    setOpen(false);
    fetchResidents();
  };

  // AGE
  const getAge = (birthdate: string) => {
    const today = new Date();
    const birth = new Date(birthdate);

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Residents</h1>
          <p className="text-sm text-gray-500">
            Manage all registered residents
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Resident
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-0">
              {/* HEADER */}
              <thead className="sticky top-0 bg-gray-100 text-gray-700 z-10">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold border-b">
                    Full Name
                  </th>
                  <th className="text-center px-4 py-3 font-semibold border-b">
                    Age
                  </th>
                  <th className="text-center px-4 py-3 font-semibold border-b">
                    Sex
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {residents.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-10 text-gray-400">
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
                      <td className="px-4 py-3 border-b text-gray-700">
                        {r.first_name} {r.last_name}
                      </td>

                      <td className="text-center px-4 py-3 border-b">
                        {getAge(r.birthdate)}
                      </td>

                      <td className="text-center px-4 py-3 border-b">
                        {r.sex || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Add Resident</h2>

            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="First Name *"
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                className="border rounded-md px-3 py-2 text-sm"
              />

              <input
                placeholder="Last Name *"
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                className="border rounded-md px-3 py-2 text-sm"
              />

              <input
                placeholder="Middle Initial"
                value={form.middle_initial}
                onChange={(e) =>
                  setForm({ ...form, middle_initial: e.target.value })
                }
                className="border rounded-md px-3 py-2 text-sm"
              />

              <input
                placeholder="Contact Number"
                value={form.contact_number}
                onChange={(e) =>
                  setForm({ ...form, contact_number: e.target.value })
                }
                className="border rounded-md px-3 py-2 text-sm"
              />

              <input
                type="date"
                value={form.birthdate}
                onChange={(e) =>
                  setForm({ ...form, birthdate: e.target.value })
                }
                className="border rounded-md px-3 py-2 text-sm col-span-2"
              />

              <select
                value={form.sex}
                onChange={(e) => setForm({ ...form, sex: e.target.value })}
                className="border rounded-md px-3 py-2 text-sm col-span-2"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm bg-red-700 text-white rounded-md"
              >
                Save Resident
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
