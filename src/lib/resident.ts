import { supabase } from "./supabase";

export async function addResident(form: any) {
  // STEP 1: insert resident
  const { data: residentData, error: residentError } = await supabase
    .from("residents")
    .insert([
      {
        first_name: form.first_name,
        middle_initial: form.middle_initial,
        last_name: form.last_name,
        birthdate: form.birthdate,
        sex: form.sex,
        contact_number: form.contact_number,
      },
    ])
    .select()
    .single();

  if (residentError) throw residentError;

  const residentId = residentData.id;

  // STEP 2: insert address (optional)
  if (form.barangay || form.zone) {
    const { error: addressError } = await supabase
      .from("resident_addresses")
      .insert([
        {
          resident_id: residentId,
          zone: form.zone,
          barangay: form.barangay,
          municipal: form.municipal,
          province: form.province,
        },
      ]);

    if (addressError) throw addressError;
  }

  return residentData;
}

// ==============================
// HEALTH RECORDS QUERIES
// ==============================

// 🔥 GET ALL HEALTH RECORDS (with resident name)
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

  return data;
}

// 🔥 GET HEALTH RECORDS BY RESIDENT
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

  return data;
}

// 🔥 ADD HEALTH RECORD
export async function addHealthRecord(form: any) {
  const { data, error } = await supabase
    .from("health_records")
    .insert([
      {
        resident_id: form.resident_id,
        visit_date: form.visit_date,
        service_type: form.service_type,
        remarks: form.remarks,
        staff_name: form.staff_name,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

// 🔥 UPDATE HEALTH RECORD
export async function updateHealthRecord(id: string, form: any) {
  const { error } = await supabase
    .from("health_records")
    .update({
      resident_id: form.resident_id,
      visit_date: form.visit_date,
      service_type: form.service_type,
      remarks: form.remarks,
      staff_name: form.staff_name,
    })
    .eq("id", id);

  if (error) throw error;
}

// 🔥 DELETE HEALTH RECORD
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

// 🔥 GET ALL PREGNANCIES
export async function getPregnancies() {
  const { data, error } = await supabase
    .from("pregnancies")
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

  return data;
}

// 🔥 ADD PREGNANCY
export async function addPregnancy(form: any) {
  const { data, error } = await supabase
    .from("pregnancies")
    .insert([
      {
        resident_id: form.resident_id,
        expected_due_date: form.expected_due_date,
        last_checkup: form.last_checkup,
        risk_level: form.risk_level,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

// 🔥 UPDATE PREGNANCY
export async function updatePregnancy(id: string, form: any) {
  const { error } = await supabase
    .from("pregnancies")
    .update({
      resident_id: form.resident_id,
      expected_due_date: form.expected_due_date,
      last_checkup: form.last_checkup,
      risk_level: form.risk_level,
    })
    .eq("id", id);

  if (error) throw error;
}

// 🔥 DELETE PREGNANCY
export async function deletePregnancy(id: string) {
  const { error } = await supabase
    .from("pregnancies")
    .delete()
    .eq("id", id);

  if (error) throw error;
}