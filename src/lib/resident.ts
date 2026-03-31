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