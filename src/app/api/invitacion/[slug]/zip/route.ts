import { ZipArchive } from "archiver";
import { Readable } from "node:stream";
import type { ReadableStream as NodeWebReadableStream } from "node:stream/web";
import { isDatabaseConfigured } from "@/lib/db";
import {
  extractDriveFolderId,
  fetchDriveFileStream,
  isDriveConfigured,
  listDriveImages,
} from "@/lib/drive";
import { getEventByInviteSlug } from "@/lib/queries";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isDatabaseConfigured() || !isDriveConfigured()) {
    return new Response("No configurado", { status: 503 });
  }

  const { slug } = await params;
  const event = await getEventByInviteSlug(slug);
  if (!event) {
    return new Response("Evento no encontrado", { status: 404 });
  }

  const folderId = extractDriveFolderId(event.drive_link);
  if (!folderId) {
    return new Response("Este evento no tiene fotos cargadas", { status: 404 });
  }

  const photos = await listDriveImages(folderId);
  if (photos.length === 0) {
    return new Response("Este evento no tiene fotos cargadas", { status: 404 });
  }

  const archive = new ZipArchive({ zlib: { level: 6 } });

  // Va agregando cada foto al zip a medida que se van descargando de Drive,
  // sin bufferear el álbum completo en memoria.
  (async () => {
    try {
      for (const photo of photos) {
        const fileResponse = await fetchDriveFileStream(photo.id);
        if (!fileResponse.body) continue;

        const nodeStream = Readable.fromWeb(
          fileResponse.body as unknown as NodeWebReadableStream<Uint8Array>,
        );
        archive.append(nodeStream, { name: photo.name || `${photo.id}.jpg` });
      }
      await archive.finalize();
    } catch (error) {
      archive.destroy(error instanceof Error ? error : new Error("Error armando el ZIP"));
    }
  })();

  const webStream = Readable.toWeb(archive) as unknown as ReadableStream;

  return new Response(webStream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}.zip"`,
    },
  });
}
