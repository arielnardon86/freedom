"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/supabase/config";
import type { UserRole } from "@/lib/types";

export type UserFormState = { error: string | null };

export async function createUser(
  _prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  if (!isSupabaseConfigured()) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const birth_date = String(formData.get("birth_date") ?? "") || null;
  const role = String(formData.get("role") ?? "client") as UserRole;
  const password = String(formData.get("password") ?? "");

  if (!full_name || !email || password.length < 8) {
    return { error: "Completá nombre, email y una contraseña de al menos 8 caracteres." };
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    return { error: error?.message ?? "No se pudo crear el usuario." };
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: data.user.id, full_name, phone, birth_date, role });

  if (profileError) {
    return { error: profileError.message };
  }

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}

export async function updateUser(
  id: string,
  _prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  if (!isSupabaseConfigured()) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const full_name = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const birth_date = String(formData.get("birth_date") ?? "") || null;
  const role = String(formData.get("role") ?? "client") as UserRole;

  if (!full_name) {
    return { error: "Completá el nombre." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name, phone, birth_date, role })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}

export type ResetPasswordState = { password: string | null; error: string | null };

export async function resetPassword(
  userId: string,
  _prevState: ResetPasswordState,
  _formData: FormData,
): Promise<ResetPasswordState> {
  if (!isSupabaseConfigured()) {
    return { password: null, error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const tempPassword = randomBytes(9).toString("base64url");

  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password: tempPassword,
  });

  if (error) return { password: null, error: error.message };

  return { password: tempPassword, error: null };
}
