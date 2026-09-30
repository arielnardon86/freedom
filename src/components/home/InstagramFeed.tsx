import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { instagramUrl, youtubeUrl } from "@/lib/content";

export function InstagramFeed() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Seguinos
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground transition-colors hover:text-gold"
            >
              <InstagramIcon className="h-6 w-6" />
              Instagram
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground transition-colors hover:text-gold"
            >
              <YoutubeIcon className="h-6 w-6" />
              YouTube
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
