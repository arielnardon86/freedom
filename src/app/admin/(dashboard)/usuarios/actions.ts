"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import { sql, isDatabaseConfigured, DATABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import type { UserRole } from "@/lib/types";

export type UserFormState = { error: string | null };

export async function createUser(
  _prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  if (!isDatabaseConfigured()) {
    return { error: DATABASE_NOT_CONFIGURED_MESSAGE };
  }

  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const birth_date = String(formData.get("birth_date") ?? "") || null;
  const role = String(formData.get("role") ?? "client") as UserRole;
  const password = String(formData.get("password") ?? "");

  if (!full_name || !email || password.length < 8) {
    return { error: "Completá nombre, email y una contraseña de al menos 8 caracteres." };
  }

  const password_hash = await hashPassword(password);

  try {
    await sql`
      insert into users ${sql({ full_name, email, phone, birth_date, role, password_hash })}
    `;
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo crear el usuario.";
    const friendly = message.includes("users_email_key")
      ? "Ya existe un usuario con ese email."
      : message;
    return { error: friendly };
  }

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}

export async function updateUser(
  id: string,
  _prevState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  if (!isDatabaseConfigured()) {
    return { error: DATABASE_NOT_CONFIGURED_MESSAGE };
  }

  const full_name = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const birth_date = String(formData.get("birth_date") ?? "") || null;
  const role = String(formData.get("role") ?? "client") as UserRole;

  if (!full_name) {
    return { error: "Completá el nombre." };
  }

  await sql`
    update users set ${sql({ full_name, phone, birth_date, role })} where id = ${id}
  `;

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}

export type ResetPasswordState = { password: string | null; error: string | null };

export async function resetPassword(
  userId: string,
  _prevState: ResetPasswordState,
  _formData: FormData,
): Promise<ResetPasswordState> {
  if (!isDatabaseConfigured()) {
    return { password: null, error: DATABASE_NOT_CONFIGURED_MESSAGE };
  }

  const tempPassword = randomBytes(9).toString("base64url");
  const password_hash = await hashPassword(tempPassword);

  await sql`update users set password_hash = ${password_hash} where id = ${userId}`;

  return { password: tempPassword, error: null };
}
