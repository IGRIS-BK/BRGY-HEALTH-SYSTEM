import { supabase } from "./supabase";

// ==============================
// TYPES
// ==============================

export type PregnancyForm = {
  resident_id: string;
  expected_due_date?: string;
  last_checkup?: string;
  risk_level?: string;
};

export type ResidentForm = {
  first_name: string;
  middle_initial?: string;
  last_name: string;
  birthdate?: string;
  sex?: string;
  contact_number?: string;
  zone?: string;
  barangay?: string;
  municipal?: string;
  province?: string;
};

// ==============================
// RESIDENT QUERIES
// ==============================

export async function addResident(form: ResidentForm) {
  const { data: residentData, error: residentError } = await supabase
    .from("residents")
    .insert([
      {
        first_name: form.first_name,
        middle_initial: form.middle_initial || null,
        last_name: form.last_name,
        birthdate: form.birthdate || null,
        sex: form.sex || null,
        contact_number: form.contact_number || null,
      },
    ])
    .select()
    .single();

  if (residentError) {
    console.error("Error inserting resident:", residentError);
    throw residentError;
  }

  const residentId = residentData.id;

  if (form.barangay || form.zone) {
    const { error: addressError } = await supabase
      .from("resident_addresses")
      .insert([
        {
          resident_id: residentId,
          zone: form.zone || null,
          barangay: form.barangay || null,
          municipal: form.municipal || null,
          province: form.province || null,
        },
      ]);

    if (addressError) {
      console.error("Error inserting address:", addressError);
      throw addressError;
    }
  }

  return residentData;
}

// 🔥 GET RESIDENTS (for dropdown)
export async function getResidents() {
  const { data, error } = await supabase
    .from("residents")
    .select("id, first_name, last_name")
    .order("first_name", { ascending: true });

  if (error) {
    console.error("Error fetching residents:", error);
    throw error;
  }

  return data ?? [];
}

// ==============================
// HEALTH RECORDS QUERIES
// ==============================

export async function getHealthRecords() {
  const { data, error } = await supabase
    .from("health_records")
    .select(`
      *,
      resident:residents (
        id,
        first_name,
        last_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getHealthRecordsByResident(residentId: string) {
  const { data, error } = await supabase
    .from("health_records")
    .select(`
      *,
      resident:residents (
        first_name,
        last_name
      )
    `)
    .eq("resident_id", residentId)
    .order("visit_date", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function addHealthRecord(form: any) {
  const { data, error } = await supabase
    .from("health_records")
    .insert([
      {
        resident_id: form.resident_id,
        visit_date: form.visit_date || null,
        service_type: form.service_type || null,
        remarks: form.remarks || null,
        staff_name: form.staff_name || null,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateHealthRecord(id: string, form: any) {
  const { error } = await supabase
    .from("health_records")
    .update({
      resident_id: form.resident_id,
      visit_date: form.visit_date || null,
      service_type: form.service_type || null,
      remarks: form.remarks || null,
      staff_name: form.staff_name || null,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteHealthRecord(id: string) {
  const { error } = await supabase
    .from("health_records")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ==============================
// PREGNANCY QUERIES
// ==============================

export async function getPregnancies() {
  const { data, error } = await supabase
    .from("pregnancies")
    .select(`
      id,
      resident_id,
      expected_due_date,
      last_checkup,
      risk_level,
      created_at,
      resident:residents!pregnancies_resident_id_fkey (
        id,
        first_name,
        middle_initial,
        last_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pregnancies:", error);
    throw error;
  }

  return data ?? [];
}

export async function addPregnancy(form: PregnancyForm) {
  const { data, error } = await supabase
    .from("pregnancies")
    .insert([
      {
        resident_id: form.resident_id,
        expected_due_date: form.expected_due_date || null,
        last_checkup: form.last_checkup || null,
        risk_level: form.risk_level || "Low",
      },
    ])
    .select(`
      id,
      resident_id,
      expected_due_date,
      last_checkup,
      risk_level,
      created_at,
      resident:residents!pregnancies_resident_id_fkey (
        id,
        first_name,
        middle_initial,
        last_name
      )
    `)
    .single();

  if (error) {
    console.error("Error adding pregnancy:", error);
    throw error;
  }

  return data;
}

export async function updatePregnancy(id: string, form: PregnancyForm) {
  const { error } = await supabase
    .from("pregnancies")
    .update({
      resident_id: form.resident_id,
      expected_due_date: form.expected_due_date || null,
      last_checkup: form.last_checkup || null,
      risk_level: form.risk_level || null,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating pregnancy:", error);
    throw error;
  }
}

export async function deletePregnancy(id: string) {
  const { error } = await supabase
    .from("pregnancies")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting pregnancy:", error);
    throw error;
  }
}