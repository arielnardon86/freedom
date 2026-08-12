import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSession } from "@/lib/supabase/middleware";

// Chequeo optimista únicamente: refresca la cookie de sesión y redirige si no
// hay usuario logueado. El chequeo de rol (¿es admin?) se hace en
// src/app/admin/(dashboard)/layout.tsx, lo más cerca posible de los datos —
// Proxy corre en cada request y no es el lugar recomendado para consultas a
// la base de datos.
export async function proxy(request: NextRequest) {
  // Sin proyecto de Supabase conectado no hay forma de autenticar: se deja
  // pasar todo para poder seguir desarrollando la UI sin romper el sitio.
  if (!isSupabaseConfigured()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/ingresar";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
