type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  form: any;
  setForm: any;
  handleAdd: () => void;
};

export default function AddResidentModal({
  open,
  setOpen,
  form,
  setForm,
  handleAdd,
}: Props) {
  if (!open) return null;

  const today = new Date().toISOString().split("T")[0]; // for display

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />

      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Add Resident</h2>

        <div className="grid grid-cols-2 gap-3">

          {/* FIRST NAME */}
          <input
            placeholder="First Name *"
            value={form.first_name}
            onChange={(e) =>
              setForm({ ...form, first_name: e.target.value })
            }
            className="border rounded-md px-3 py-2 text-sm"
          />

          {/* LAST NAME */}
          <input
            placeholder="Last Name *"
            value={form.last_name}
            onChange={(e) =>
              setForm({ ...form, last_name: e.target.value })
            }
            className="border rounded-md px-3 py-2 text-sm"
          />

          {/* MIDDLE INITIAL */}
          <input
            placeholder="Middle Initial"
            value={form.middle_initial}
            onChange={(e) =>
              setForm({ ...form, middle_initial: e.target.value })
            }
            className="border rounded-md px-3 py-2 text-sm"
          />

          {/* CONTACT */}
          <input
            placeholder="Contact Number"
            value={form.contact_number}
            onChange={(e) =>
              setForm({ ...form, contact_number: e.target.value })
            }
            className="border rounded-md px-3 py-2 text-sm"
          />

          {/* BIRTHDATE */}
          <input
            type="date"
            value={form.birthdate}
            onChange={(e) =>
              setForm({ ...form, birthdate: e.target.value })
            }
            className="border rounded-md px-3 py-2 text-sm col-span-2"
          />

          {/* SEX */}
          <select
            value={form.sex}
            onChange={(e) => setForm({ ...form, sex: e.target.value })}
            className="border rounded-md px-3 py-2 text-sm col-span-2"
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* CREATED AT (READ ONLY) */}
          <input
            value={today}
            disabled
            className="border rounded-md px-3 py-2 text-sm col-span-2 bg-gray-100 text-gray-500"
          />
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
  );
}