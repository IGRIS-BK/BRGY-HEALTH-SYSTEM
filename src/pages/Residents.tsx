import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Resident = {
  id: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  sex: string;
};

export default function Residents() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    birthdate: "",
    sex: "",
  });

  // ✅ fetch residents
  const fetchResidents = async () => {
    const { data, error } = await supabase
      .from("residents")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setResidents(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  // ✅ add resident
  const handleAdd = async () => {
    const { error } = await supabase.from("residents").insert([form]);

    if (error) {
      alert(error.message);
      return;
    }

    setForm({
      first_name: "",
      last_name: "",
      birthdate: "",
      sex: "",
    });

    fetchResidents();
  };

  // ✅ compute age
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

      {/* ADD FORM */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="font-semibold mb-4">Add Resident</h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) =>
              setForm({ ...form, first_name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) =>
              setForm({ ...form, last_name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={form.birthdate}
            onChange={(e) =>
              setForm({ ...form, birthdate: e.target.value })
            }
            className="border p-2 rounded"
          />

          <select
            value={form.sex}
            onChange={(e) =>
              setForm({ ...form, sex: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Resident
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="font-semibold mb-4">Residents List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-center">Age</th>
                <th className="text-center">Sex</th>
              </tr>
            </thead>

            <tbody>
              {residents.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-3">
                    {r.first_name} {r.last_name}
                  </td>
                  <td className="text-center">
                    {getAge(r.birthdate)}
                  </td>
                  <td className="text-center">{r.sex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}