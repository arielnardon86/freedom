const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3/files";

export function isDriveConfigured() {
  return Boolean(process.env.GOOGLE_DRIVE_API_KEY);
}

export const DRIVE_NOT_CONFIGURED_MESSAGE =
  "Todavía no está conectada la API de Google Drive. Configurá GOOGLE_DRIVE_API_KEY en .env.local.";

// Acepta links del tipo:
// https://drive.google.com/drive/folders/<id>
// https://drive.google.com/drive/folders/<id>?usp=sharing
export function extractDriveFolderId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

export type DriveImage = {
  id: string;
  name: string;
  thumbnailLink: string | null;
};

export async function listDriveImages(folderId: string): Promise<DriveImage[]> {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    q: `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`,
    fields: "files(id,name,thumbnailLink)",
    pageSize: "1000",
    key: apiKey,
  });

  const response = await fetch(`${DRIVE_API_BASE}?${params.toString()}`, {
    // Las fotos de un evento no cambian a cada rato; se puede cachear un rato.
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`No se pudieron listar las fotos de Drive (${response.status}).`);
  }

  const data = (await response.json()) as { files?: DriveImage[] };
  return data.files ?? [];
}

// Reenvía el archivo desde Route Handlers sin exponer la API key al cliente.
export async function fetchDriveFileStream(fileId: string) {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) throw new Error(DRIVE_NOT_CONFIGURED_MESSAGE);

  const params = new URLSearchParams({ alt: "media", key: apiKey });
  const response = await fetch(`${DRIVE_API_BASE}/${fileId}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`No se pudo descargar el archivo de Drive (${response.status}).`);
  }

  return response;
}
