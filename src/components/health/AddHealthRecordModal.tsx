import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AddHealthRecordModal({
  open,
  setOpen,
  form,
  setForm,
  handleAdd,
}: any) {
  const [residents, setResidents] = useState<any[]>([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const { data } = await supabase
        .from("residents")
        .select("id, first_name, last_name");

      setResidents(data || []);
    };

    fetchResidents();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="font-bold text-lg">Add Health Record</h2>

        {/* RESIDENT */}
        <select
          value={form.resident_id}
          onChange={(e) =>
            setForm({ ...form, resident_id: e.target.value })
          }
          className="w-full border p-2 rounded"
        >
          <option value="">Select Resident</option>
          {residents.map((r) => (
            <option key={r.id} value={r.id}>
              {r.first_name} {r.last_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.visit_date}
          onChange={(e) =>
            setForm({ ...form, visit_date: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Service Type"
          value={form.service_type}
          onChange={(e) =>
            setForm({ ...form, service_type: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Staff Name"
          value={form.staff_name}
          onChange={(e) =>
            setForm({ ...form, staff_name: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Remarks"
          value={form.remarks}
          onChange={(e) =>
            setForm({ ...form, remarks: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button
            onClick={handleAdd}
            className="bg-red-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}