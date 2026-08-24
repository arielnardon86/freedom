const VISITOR_ID_KEY = "freedom-visitor-id";
const LIKED_PHOTOS_KEY = "freedom-liked-photos";

// Solo se usa desde componentes de cliente (landing pública de invitación).
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function getLikedPhotoIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(LIKED_PHOTOS_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function saveLikedPhotoIds(ids: Iterable<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LIKED_PHOTOS_KEY, JSON.stringify([...ids]));
}
