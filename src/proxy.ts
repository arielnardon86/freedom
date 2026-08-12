import { NextResponse, type NextRequest } from "next/server";
import { isDatabaseConfigured } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

// Chequeo optimista únicamente: verifica la firma de la cookie de sesión
// (sin ninguna consulta a la base) y redirige si no hay sesión válida. El
// chequeo de rol (¿es admin?) se hace en
// src/app/admin/(dashboard)/layout.tsx, lo más cerca posible de los datos.
export async function proxy(request: NextRequest) {
  // Sin base de datos conectada no hay forma de autenticar: se deja pasar
  // todo para poder seguir desarrollando la UI sin romper el sitio.
  if (!isDatabaseConfigured()) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/ingresar";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
