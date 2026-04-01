import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import ResidentsTable from "../components/residents/ResidentsTable";
import AddResidentModal from "../components/residents/AddResidentModal";
import { toast } from "sonner";

export default function Residents() {
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState<any>(null);

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
      toast.warning("Please fill required fields");
      return;
    }

    const loadingToast = toast.loading("Saving resident...");

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

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Resident added successfully ✅");

    setForm(initialForm);
    setOpen(false);
    fetchResidents();
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!form.first_name || !form.last_name || !form.birthdate) {
      toast.warning("Please fill required fields");
      return;
    }

    const loadingToast = toast.loading("Updating resident...");

    const { error } = await supabase
      .from("residents")
      .update({
        first_name: form.first_name,
        middle_initial: form.middle_initial || null,
        last_name: form.last_name,
        birthdate: form.birthdate,
        sex: form.sex || null,
        contact_number: form.contact_number || null,
      })
      .eq("id", selectedResident.id);

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Resident updated successfully ✏️");

    setEditOpen(false);
    setSelectedResident(null);
    setForm(initialForm);
    fetchResidents();
  };

  // EDIT CLICK
  const handleEditClick = (resident: any) => {
    setSelectedResident(resident);

    setForm({
      first_name: resident.first_name,
      middle_initial: resident.middle_initial || "",
      last_name: resident.last_name,
      birthdate: resident.birthdate,
      sex: resident.sex || "",
      contact_number: resident.contact_number || "",
    });

    setEditOpen(true);
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
      <ResidentsTable
        residents={residents}
        loading={loading}
        getAge={getAge}
        onEdit={handleEditClick}
      />

      {/* ADD MODAL */}
      <AddResidentModal
        open={open}
        setOpen={setOpen}
        form={form}
        setForm={setForm}
        handleAdd={handleAdd}
      />

      {/* EDIT MODAL */}
      <AddResidentModal
        open={editOpen}
        setOpen={setEditOpen}
        form={form}
        setForm={setForm}
        handleAdd={handleUpdate}
      />
    </div>
  );
}