import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { PregnancyForm } from "../../lib/resident";

type Resident = {
  id: string;
  first_name: string;
  last_name: string;
};

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess: () => void;
  addPregnancy: (data: PregnancyForm) => Promise<any>;
  residents: Resident[];
  selected?: any;
};

export default function AddPregnancyModal({
  open,
  setOpen,
  onSuccess,
  addPregnancy,
  residents,
}: Props) {
  const initialForm: PregnancyForm = {
    resident_id: "",
    expected_due_date: "",
    last_checkup: "",
    risk_level: "",
  };

  const [form, setForm] = useState<PregnancyForm>(initialForm);
  const [loading, setLoading] = useState(false);

  // ✅ Reset form every time modal opens
  useEffect(() => {
    if (open) {
      setForm(initialForm);
    }
  }, [open]);

  const handleSave = async () => {
    try {
      if (!form.resident_id) {
        toast.error("Resident is required");
        return;
      }

      setLoading(true);

      await addPregnancy(form);

      toast.success("Pregnancy added");

      setOpen(false);
      onSuccess();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Pregnancy</h2>

        <div className="space-y-3">
          {/* Resident Select */}
          <select
            value={form.resident_id ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, resident_id: e.target.value }))
            }
            className="w-full border px-3 py-2 rounded bg-white"
          >
            <option value="">Select Resident</option>

            {residents.length === 0 ? (
              <option disabled>No residents available</option>
            ) : (
              residents.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.first_name} {r.last_name}
                </option>
              ))
            )}
          </select>

          {/* Expected Due Date */}
          <input
            type="date"
            value={form.expected_due_date ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                expected_due_date: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded"
          />

          {/* Last Checkup */}
          <input
            type="date"
            value={form.last_checkup ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                last_checkup: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded"
          />

          {/* Risk Level */}
          <select
            value={form.risk_level ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                risk_level: e.target.value,
              }))
            }
            className="w-full border px-3 py-2 rounded bg-white"
          >
            <option value="">Select Risk Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}