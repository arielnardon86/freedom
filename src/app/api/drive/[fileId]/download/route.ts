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
  const name = new URL(request.url).searchParams.get("name");

  try {
    const driveResponse = await fetchDriveFileStream(fileId);

    const headers = new Headers();
    headers.set(
      "Content-Type",
      driveResponse.headers.get("content-type") ?? "application/octet-stream",
    );
    // Drive suele responder solo "attachment" sin filename, así que armamos
    // el nombre nosotros en vez de confiar en su header.
    headers.set("Content-Disposition", `attachment; filename="${name || `foto-${fileId}.jpg`}"`);

    return new Response(driveResponse.body, { headers });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Error", { status: 502 });
  }
}
