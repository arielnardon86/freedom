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

export function extractDriveFolderIds(urls: string[]): string[] {
  const ids = urls.map((url) => extractDriveFolderId(url)).filter((id): id is string => Boolean(id));
  return Array.from(new Set(ids));
}

export type DriveImage = {
  id: string;
  name: string;
  thumbnailLink: string | null;
};

export type DriveVideo = DriveImage;

// thumbnailLink viene con un "=sNNN" al final que controla el tamaño que
// sirve el CDN de Google. Pedimos una versión más grande para la vista
// previa ampliada sin tener que bajar el archivo original por nuestro
// servidor (sigue siendo Google quien lo sirve, no cuenta contra nuestra
// cuota de la API de Drive).
export function driveThumbnailUrl(thumbnailLink: string | null, size: number): string | null {
  if (!thumbnailLink) return null;
  return thumbnailLink.replace(/=s\d+$/, `=s${size}`);
}

async function listDriveFilesByMime(folderId: string, mimePrefix: string): Promise<DriveImage[]> {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    q: `'${folderId}' in parents and trashed = false and mimeType contains '${mimePrefix}'`,
    fields: "files(id,name,thumbnailLink)",
    pageSize: "1000",
    key: apiKey,
  });

  const response = await fetch(`${DRIVE_API_BASE}?${params.toString()}`, {
    // Las fotos/videos de un evento no cambian a cada rato; se puede cachear un rato.
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`No se pudo listar el contenido de Drive (${response.status}).`);
  }

  const data = (await response.json()) as { files?: DriveImage[] };
  return data.files ?? [];
}

// Junta los archivos de varias carpetas en una sola lista, sin duplicar si un
// mismo archivo apareciera en más de una carpeta.
async function mergeFromFolders(
  folderIds: string[],
  lister: (folderId: string) => Promise<DriveImage[]>,
): Promise<DriveImage[]> {
  const results = await Promise.all(folderIds.map(lister));
  const seen = new Set<string>();
  const merged: DriveImage[] = [];
  for (const files of results) {
    for (const file of files) {
      if (seen.has(file.id)) continue;
      seen.add(file.id);
      merged.push(file);
    }
  }
  return merged;
}

export function listDriveImages(folderId: string): Promise<DriveImage[]> {
  return listDriveFilesByMime(folderId, "image/");
}

export function listDriveImagesFromFolders(folderIds: string[]): Promise<DriveImage[]> {
  return mergeFromFolders(folderIds, listDriveImages);
}

export function listDriveVideos(folderId: string): Promise<DriveVideo[]> {
  return listDriveFilesByMime(folderId, "video/");
}

export function listDriveVideosFromFolders(folderIds: string[]): Promise<DriveVideo[]> {
  return mergeFromFolders(folderIds, listDriveVideos);
}

// Reenvía el archivo desde Route Handlers sin exponer la API key al cliente.
// Si se pasa `range`, lo reenvía tal cual a Drive para poder servir video
// (seek, reproducción progresiva) igual que un archivo estático.
export async function fetchDriveFileStream(fileId: string, range?: string | null) {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) throw new Error(DRIVE_NOT_CONFIGURED_MESSAGE);

  const params = new URLSearchParams({ alt: "media", key: apiKey });
  const response = await fetch(`${DRIVE_API_BASE}/${fileId}?${params.toString()}`, {
    headers: range ? { Range: range } : undefined,
  });

  if (!response.ok && response.status !== 206) {
    throw new Error(`No se pudo descargar el archivo de Drive (${response.status}).`);
  }

  return response;
}
