"use client";

import { useActionState, useState } from "react";
import { submitReview, type ReviewFormState } from "@/app/invitacion/[slug]/actions";
import { Button } from "@/components/ui/Button";
import { fieldInputClasses } from "@/components/ui/FormField";
import type { Review } from "@/lib/types";

const initialState: ReviewFormState = { success: false, error: null };

function Stars({ value }: { value: number }) {
  return (
    <span className="text-gold" aria-hidden="true">
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}

function RatingInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} estrellas`}
          className={`text-2xl leading-none transition-colors ${
            n <= value ? "text-gold" : "text-border-strong hover:text-gold/60"
          }`}
        >
          ★
        </button>
      ))}
      <input type="hidden" name="rating" value={value} />
    </div>
  );
}

export function ReviewsSection({ eventId, reviews }: { eventId: string; reviews: Review[] }) {
  const action = submitReview.bind(null, eventId);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [rating, setRating] = useState(5);

  return (
    <section className="border-t border-border px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Reseñas
          </span>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            ¿Qué te pareció tu experiencia?
          </h2>
        </div>

        {reviews.length > 0 ? (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-border bg-background-elevated p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-foreground">{review.author_name}</span>
                  <Stars value={review.rating} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : null}

        {state.success ? (
          <p className="rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-center text-sm text-gold">
            ¡Gracias por tu reseña! Se va a publicar apenas la aprobemos.
          </p>
        ) : (
          <form action={formAction} className="flex flex-col gap-4 rounded-2xl border border-border bg-background-elevated p-6">
            <h3 className="font-display text-base font-semibold text-foreground">
              Dejá tu reseña
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted">Tu calificación</label>
              <RatingInput value={rating} onChange={setRating} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="author_name" className="text-xs font-medium text-muted">
                Tu nombre
              </label>
              <input
                id="author_name"
                name="author_name"
                required
                maxLength={120}
                className={fieldInputClasses}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="comment" className="text-xs font-medium text-muted">
                Tu comentario
              </label>
              <textarea
                id="comment"
                name="comment"
                required
                maxLength={1000}
                rows={4}
                className={fieldInputClasses}
              />
            </div>

            {state.error ? (
              <p className="rounded-lg border border-red-900/40 bg-red-950/30 px-3 py-2 text-xs text-red-300">
                {state.error}
              </p>
            ) : null}

            <Button type="submit" variant="primary" disabled={pending} className="w-fit">
              {pending ? "Enviando..." : "Enviar reseña"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
