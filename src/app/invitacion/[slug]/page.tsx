import { notFound } from "next/navigation";
import { InvitationHero } from "@/components/invitacion/InvitationHero";
import { PhotoGrid } from "@/components/invitacion/PhotoGrid";
import { VideoGrid } from "@/components/invitacion/VideoGrid";
import { MostLiked } from "@/components/invitacion/MostLiked";
import { ReviewsSection } from "@/components/invitacion/ReviewsSection";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { Button } from "@/components/ui/Button";
import { isDatabaseConfigured } from "@/lib/db";
import {
  extractDriveFolderIds,
  isDriveConfigured,
  listDriveImagesFromFolders,
  listDriveVideosFromFolders,
} from "@/lib/drive";
import type { DriveImage, DriveVideo } from "@/lib/drive";
import { getEventByInviteSlug, getLikeCounts, listApprovedReviews } from "@/lib/queries";

export default async function InvitacionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isDatabaseConfigured()) {
    notFound();
  }

  const event = await getEventByInviteSlug(slug);
  if (!event) {
    notFound();
  }

  const folderIds = extractDriveFolderIds(event.drive_links);
  const galleryReady = isDriveConfigured() && folderIds.length > 0;

  let photos: DriveImage[] = [];
  let videos: DriveVideo[] = [];
  let galleryError = false;

  if (galleryReady) {
    try {
      [photos, videos] = await Promise.all([
        listDriveImagesFromFolders(folderIds),
        listDriveVideosFromFolders(folderIds),
      ]);
    } catch {
      galleryError = true;
    }
  }

  const [likeCounts, reviews] = await Promise.all([
    getLikeCounts(event.id),
    listApprovedReviews(event.id),
  ]);

  const mostLiked = photos
    .filter((photo) => (likeCounts[photo.id] ?? 0) > 0)
    .sort((a, b) => (likeCounts[b.id] ?? 0) - (likeCounts[a.id] ?? 0))
    .slice(0, 6);

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <InvitationHero event={event} />

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          {!galleryReady ? (
            <p className="py-16 text-center text-sm text-muted">
              Todavía no hay fotos cargadas para este evento.
            </p>
          ) : galleryError ? (
            <p className="py-16 text-center text-sm text-muted">
              No pudimos cargar las fotos en este momento. Probá de nuevo más tarde.
            </p>
          ) : (
            <>
              <h2 className="font-display text-2xl font-semibold text-foreground">Las fotos</h2>
              <PhotoGrid eventId={event.id} photos={photos} initialLikes={likeCounts} />
            </>
          )}
        </div>
      </section>

      {videos.length > 0 ? (
        <section className="border-t border-border px-6 py-16 sm:px-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">Los videos</h2>
            <VideoGrid videos={videos} />
          </div>
        </section>
      ) : null}

      {mostLiked.length > 0 ? <MostLiked photos={mostLiked} likeCounts={likeCounts} /> : null}

      <ReviewsSection eventId={event.id} reviews={reviews} />

      <section className="border-t border-border bg-background-elevated px-6 py-16 text-center sm:px-10">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            ¿Te gustó tu experiencia con Freedom Fotografía?
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Cubrimos bodas, 15 años, egresos, eventos corporativos y sesiones particulares en
            Córdoba y alrededores. Conocé todos nuestros servicios.
          </p>
          <Button href="/" variant="primary">
            Conocer Freedom Fotografía
          </Button>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
