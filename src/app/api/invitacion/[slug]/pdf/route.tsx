import { Document, Page, Text, View, Image, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { isDatabaseConfigured } from "@/lib/db";
import { getEventByInviteSlug } from "@/lib/queries";
import { generateQrDataUrl } from "@/lib/qrcode";
import { getBaseUrl } from "@/lib/url";
import { eventTypeLabels } from "@/lib/types";

export const runtime = "nodejs";

const GOLD = "#B8862F";
const INK = "#171207";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingVertical: 40,
    paddingHorizontal: 40,
    alignItems: "center",
    fontFamily: "Helvetica",
  },
  brand: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: GOLD,
    letterSpacing: 1,
    marginBottom: 22,
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: GOLD,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    textAlign: "center",
    color: INK,
  },
  meta: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 24,
    textAlign: "center",
  },
  qrWrap: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 18,
  },
  qr: {
    width: 190,
    height: 190,
  },
  linkLabel: {
    fontSize: 9,
    color: "#999999",
    marginBottom: 2,
  },
  link: {
    fontSize: 10,
    color: INK,
    marginBottom: 22,
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
        <Text style={styles.brand}>FREEDOM FOTOGRAFÍA</Text>

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
          Escaneá el código para ver, likear y descargar las fotos de tu evento.
        </Text>
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
