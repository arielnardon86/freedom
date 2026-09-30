import { fetchDriveFileStream, isDriveConfigured } from "@/lib/drive";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  if (!isDriveConfigured()) {
    return new Response("Drive no configurado", { status: 503 });
  }

  const { fileId } = await params;
  const range = request.headers.get("range");

  try {
    const driveResponse = await fetchDriveFileStream(fileId, range);

    const headers = new Headers();
    headers.set("Content-Type", driveResponse.headers.get("content-type") ?? "video/mp4");
    headers.set("Accept-Ranges", "bytes");
    // Sin "attachment": queremos que se reproduzca en el <video>, no que se descargue.
    const contentLength = driveResponse.headers.get("content-length");
    if (contentLength) headers.set("Content-Length", contentLength);
    const contentRange = driveResponse.headers.get("content-range");
    if (contentRange) headers.set("Content-Range", contentRange);

    return new Response(driveResponse.body, {
      status: driveResponse.status === 206 ? 206 : 200,
      headers,
    });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Error", { status: 502 });
  }
}
