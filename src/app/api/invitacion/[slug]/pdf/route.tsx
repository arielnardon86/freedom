import fs from "node:fs";
import path from "node:path";
import { Document, Page, Text, View, Image, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { isDatabaseConfigured } from "@/lib/db";
import { getEventByInviteSlug } from "@/lib/queries";
import { generateQrDataUrl } from "@/lib/qrcode";
import { getBaseUrl } from "@/lib/url";
import { eventTypeLabels } from "@/lib/types";

export const runtime = "nodejs";

const GOLD = "#B8862F";
const INK = "#171207";

// Se lee una sola vez (no cambia entre requests).
const logoBuffer = fs.readFileSync(
  path.join(process.cwd(), "public/images/logo-freedom-wordmark.png"),
);
const LOGO_DATA_URL = `data:image/png;base64,${logoBuffer.toString("base64")}`;
const LOGO_ASPECT_RATIO = 224 / 725; // alto / ancho del archivo original

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  frame: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: GOLD,
    paddingVertical: 28,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160 * LOGO_ASPECT_RATIO,
    marginBottom: 14,
  },
  rule: {
    width: 46,
    height: 1.5,
    backgroundColor: GOLD,
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: GOLD,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 21,
    fontFamily: "Times-Bold",
    marginBottom: 5,
    textAlign: "center",
    color: INK,
  },
  meta: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 20,
    textAlign: "center",
  },
  qrWrap: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 18,
  },
  qr: {
    width: 186,
    height: 186,
  },
  linkLabel: {
    fontSize: 9,
    color: "#999999",
    marginBottom: 2,
  },
  link: {
    fontSize: 10,
    color: INK,
    marginBottom: 18,
  },
  footer: {
    fontSize: 9,
    color: "#999999",
    textAlign: "center",
    maxWidth: 320,
  },
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isDatabaseConfigured()) {
    return new Response("No configurado", { status: 503 });
  }

  const { slug } = await params;
  const event = await getEventByInviteSlug(slug);

  if (!event) {
    return new Response("Evento no encontrado", { status: 404 });
  }

  const baseUrl = await getBaseUrl();
  const inviteUrl = `${baseUrl}/invitacion/${slug}`;
  const qrDataUrl = await generateQrDataUrl(inviteUrl);

  const fecha = new Date(`${event.fecha_evento}T00:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const doc = (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.frame}>
          <Image src={LOGO_DATA_URL} style={styles.logo} />
          <View style={styles.rule} />

          <Text style={styles.eyebrow}>{eventTypeLabels[event.tipo_evento]}</Text>
          <Text style={styles.title}>{event.nombre}</Text>
          <Text style={styles.meta}>
            {fecha}
            {event.lugar ? ` · ${event.lugar}` : ""}
          </Text>

          <View style={styles.qrWrap}>
            <Image src={qrDataUrl} style={styles.qr} />
          </View>

          <Text style={styles.linkLabel}>O ingresá directamente a:</Text>
          <Text style={styles.link}>{inviteUrl}</Text>

          <Text style={styles.footer}>
            Escaneá el código para ver, likear y descargar las fotos del evento.
          </Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invitacion-${slug}.pdf"`,
    },
  });
}
