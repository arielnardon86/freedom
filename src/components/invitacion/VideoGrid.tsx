import type { DriveVideo } from "@/lib/drive";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VideoGrid({ videos }: { videos: DriveVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {videos.map((video) => (
        <div key={video.id} className="flex flex-col gap-2">
          <div className="relative overflow-hidden rounded-xl border border-border bg-black">
            <video
              controls
              preload="none"
              poster={video.thumbnailLink ?? undefined}
              className="aspect-video w-full"
            >
              <source src={`/api/drive/${video.id}/video`} />
            </video>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 truncate text-xs text-muted">{video.name}</span>
            <a
              href={`/api/drive/${video.id}/download?name=${encodeURIComponent(video.name)}`}
              className="flex flex-none items-center gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-gold hover:text-gold-light"
              aria-label={`Descargar ${video.name}`}
            >
              <DownloadIcon />
              Descargar
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
