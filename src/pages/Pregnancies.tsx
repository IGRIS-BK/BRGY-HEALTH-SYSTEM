import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getPregnancies,
  addPregnancy,
  getResidents, // ✅ IMPORT THIS
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

  // 🔥 Fetch residents (for dropdown)
  const fetchResidents = async () => {
    try {
      const res = await getResidents();
      setResidents(res || []);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 🔥 Load everything
  useEffect(() => {
    fetchData();
    fetchResidents(); // ✅ IMPORTANT
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Pregnancy Records
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Pregnancy
        </button>
      </div>

      {/* SUMMARY */}
      <PregnancySummaryCards data={data} />

      {/* TABLE */}
      <PregnancyTable data={data} loading={loading} />

      {/* MODAL */}
      <AddPregnancyModal
        open={open}
        setOpen={setOpen}
        onSuccess={fetchData}
        addPregnancy={addPregnancy}
        residents={residents} // ✅ FIXED
      />
    </div>
  );
}