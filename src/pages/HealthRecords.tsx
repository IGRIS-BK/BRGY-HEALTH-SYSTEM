import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

import HealthRecordsTable from "../components/health/HealthRecordsTable";
import AddHealthRecordModal from "../components/health/AddHealthRecordModal";

export default function HealthRecords() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const initialForm = {
    resident_id: "",
    visit_date: "",
    service_type: "",
    remarks: "",
    staff_name: "",
  };

  const [form, setForm] = useState(initialForm);

  // FETCH RECORDS (with resident name)
  const fetchRecords = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("health_records")
      .select(`
        *,
        resident:residents (
          first_name,
          last_name
        )
      `)
      .order("created_at", { ascending: false });

    if (!error) setRecords(data || []);
    else console.error(error);

    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // ADD RECORD
  const handleAdd = async () => {
    if (!form.resident_id || !form.visit_date || !form.service_type) {
      toast.warning("Please fill required fields");
      return;
    }

    const loadingToast = toast.loading("Saving record...");

    const { error } = await supabase.from("health_records").insert([form]);

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Health record added ✅");

    setForm(initialForm);
    setOpen(false);
    fetchRecords();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Health Records</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Record
        </button>
      </div>

      <HealthRecordsTable records={records} loading={loading} />

      <AddHealthRecordModal
        open={open}
        setOpen={setOpen}
        form={form}
        setForm={setForm}
        handleAdd={handleAdd}
      />
    </div>
  );
}