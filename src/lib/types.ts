export type UserRole = "admin" | "client";

export type EventType =
  | "casamiento"
  | "15_anos"
  | "cumpleanos"
  | "egresados"
  | "sesion_particular"
  | "corporativo";

export type PaymentStatus = "pendiente" | "parcial" | "pagado";

export const eventTypeLabels: Record<EventType, string> = {
  casamiento: "Casamiento",
  "15_anos": "Fiesta de 15",
  cumpleanos: "Cumpleaños",
  egresados: "Egresados",
  sesion_particular: "Sesión de fotos particular",
  corporativo: "Evento corporativo",
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  pendiente: "Pendiente",
  parcial: "Cancelado parcialmente",
  pagado: "Cancelado",
};

export const roleLabels: Record<UserRole, string> = {
  admin: "Administrador",
  client: "Cliente",
};

export type Profile = {
  id: string;
  full_name: string;
  phone: string | null;
  birth_date: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
  email?: string | null;
};

export type Event = {
  id: string;
  nombre: string;
  cliente_id: string | null;
  fecha_evento: string;
  lugar: string | null;
  tipo_evento: EventType;
  drive_link: string | null;
  entregado: boolean;
  estado_pago: PaymentStatus;
  invite_slug: string | null;
  created_at: string;
  updated_at: string;
  cliente?: Pick<Profile, "id" | "full_name"> | null;
};
