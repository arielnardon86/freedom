import { fetchDriveFileStream, isDriveConfigured } from "@/lib/drive";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  if (!isDriveConfigured()) {
    return new Response("Drive no configurado", { status: 503 });
  }

  const { fileId } = await params;

  try {
    const driveResponse = await fetchDriveFileStream(fileId);

    const headers = new Headers();
    headers.set(
      "Content-Type",
      driveResponse.headers.get("content-type") ?? "application/octet-stream",
    );
    headers.set(
      "Content-Disposition",
      driveResponse.headers.get("content-disposition") ??
        `attachment; filename="foto-${fileId}.jpg"`,
    );

    return new Response(driveResponse.body, { headers });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Error", { status: 502 });
  }
}
