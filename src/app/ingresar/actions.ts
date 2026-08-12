"use server";

import { redirect } from "next/navigation";
import { sql, isDatabaseConfigured, DATABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import type { UserRole } from "@/lib/types";

export type SignInState = { error: string | null };

export async function signIn(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!isDatabaseConfigured()) {
    return { error: DATABASE_NOT_CONFIGURED_MESSAGE };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  const [user] = await sql<{ id: string; role: UserRole; password_hash: string }[]>`
    select id, role, password_hash from users where email = ${email}
  `;

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return { error: "Email o contraseña incorrectos." };
  }

  await createSession({ sub: user.id, role: user.role });

  redirect(user.role === "admin" ? "/admin" : "/portal");
}
