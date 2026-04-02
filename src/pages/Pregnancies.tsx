import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getPregnancies,
  addPregnancy,
  getResidents,
  deletePregnancy, // ✅ ADD THIS
} from "../lib/resident";

import PregnancyTable from "../components/pregnancies/PregnancyTable";
import AddPregnancyModal from "../components/pregnancies/AddPregnancyModal";
import PregnancySummaryCards from "../components/pregnancies/PregnancySummaryCards";

type Resident = {
  id: string;
  first_name: string;
  last_name: string;
};

export default function Pregnancies() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [residents, setResidents] = useState<Resident[]>([]);

  // 🔥 (NEW) for edit
  const [selected, setSelected] = useState<any>(null);

  // 🔥 Fetch pregnancies
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPregnancies();
      setData(res || []);
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  // 🔥 Fetch residents
  const fetchResidents = async () => {
    try {
      const res = await getResidents();
      setResidents(res || []);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchResidents();
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Pregnancy Records
        </h1>

        <button
          onClick={() => {
            setSelected(null); // ✅ reset when adding
            setOpen(true);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Pregnancy
        </button>
      </div>

      {/* SUMMARY */}
      <PregnancySummaryCards data={data} />

      {/* TABLE */}
      <PregnancyTable
        data={data}
        loading={loading}
        onEdit={(item) => {
          setSelected(item);   // ✅ store selected
          setOpen(true);       // open modal
        }}
        onDelete={async (id) => {
          try {
            await deletePregnancy(id);
            toast.success("Deleted successfully");
            fetchData();
          } catch (err: any) {
            toast.error(err.message);
          }
        }}
      />

      {/* MODAL */}
      <AddPregnancyModal
        open={open}
        setOpen={setOpen}
        onSuccess={fetchData}
        addPregnancy={addPregnancy}
        residents={residents}
        selected={selected} // ✅ pass for editing (important)
      />
    </div>
  );
}