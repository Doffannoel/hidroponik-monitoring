import { Star } from "lucide-react";
import { testimonials } from "@/data/landing-content";
import { SectionTitle } from "@/components/shared/section-title";

export function TestimonialsSection() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="section-space pb-10">
      <div className="container-shell">
        <SectionTitle title="Apa Kata Pengguna Kami" />
        <div className="testimonial-marquee mt-10">
          <div className="testimonial-track">
            {marqueeItems.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                aria-hidden={index >= testimonials.length}
                className="card-base testimonial-card p-7"
              >
                <p className="text-sm leading-7 text-textSoft">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{item.name}</p>
                      <p className="text-sm text-textSoft">{item.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
