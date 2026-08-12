// Crea (o actualiza la contraseña de) un usuario admin de prueba para poder
// entrar al panel en local. Se corre con: npm run db:seed
//
// Variables opcionales: SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD,
// SEED_ADMIN_NAME. Si no se pasan, usa valores por defecto.

import { sql } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth/password";

async function main() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@fotosfreedom.com").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? "admin1234";
  const full_name = process.env.SEED_ADMIN_NAME ?? "Admin de prueba";

  const password_hash = await hashPassword(password);

  await sql`
    insert into users (full_name, email, password_hash, role)
    values (${full_name}, ${email}, ${password_hash}, 'admin')
    on conflict (email) do update
      set password_hash = excluded.password_hash,
          role = 'admin'
  `;

  console.log("Usuario admin listo:");
  console.log(`  email:    ${email}`);
  console.log(`  password: ${password}`);

  await sql.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
