"use client";

import { useEffect, useRef, useState } from "react";
import { Leaf } from "lucide-react";
import { features } from "@/data/landing-content";
import { SectionTitle } from "@/components/shared/section-title";

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-space">
      <div className="container-shell">
        <SectionTitle title="Fitur Utama" align="left" />
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const hasLargeIcon = [
              "Monitoring Real-time",
              "Hemat Tempat",
              "Ramah Pemula",
            ].includes(feature.title);
            const hasDarkCard = feature.title === "Hemat Tempat";
            const className =
              index === 0
                ? "lg:col-span-6"
                : index === 1
                  ? "lg:col-span-3"
                  : index === 2
                    ? "lg:col-span-3"
                    : "lg:col-span-6";

            return (
              <article
                key={feature.title}
                className={[
                  className,
                  "feature-card-reveal rounded-[28px] p-7 shadow-soft",
                  isInView ? "is-visible" : "",
                  feature.highlight
                    ? "bg-primary text-white"
                    : hasDarkCard
                      ? "bg-[#43493D] text-white"
                    : "border border-primary/5 bg-card text-primary",
                ].join(" ")}
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div
                  className={[
                    "flex items-center justify-center rounded-full bg-white/15 text-current",
                    hasLargeIcon ? "h-16 w-16" : "h-12 w-12",
                  ].join(" ")}
                >
                  <Icon className={hasLargeIcon ? "h-8 w-8" : "h-5 w-5"} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>
                <p
                  className={
                    feature.highlight || hasDarkCard
                      ? "mt-3 text-sm leading-7 text-white/80"
                      : "mt-3 text-sm leading-7 text-textSoft"
                  }
                >
                  {feature.description}
                </p>

                {feature.badges ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {feature.badges.map((badge) => {
                      const badgeClassName =
                        feature.title === "Monitoring Real-time" &&
                        badge === "OTOMATIS"
                          ? "bg-[#C4EFA3] text-primary"
                          : feature.title === "Monitoring Real-time" &&
                              badge === "WIFI SYNC"
                            ? "bg-[#DDE6D1] text-primary"
                            : "bg-[#DCECCF] text-primary";

                      return (
                        <span
                          key={badge}
                          className={`rounded-full px-3 py-1 text-[11px] font-bold ${badgeClassName}`}
                        >
                          {badge}
                        </span>
                      );
                    })}
                  </div>
                ) : null}

                {feature.imageLabel ? (
                  <div className="mt-6 flex items-center gap-4 rounded-[22px] bg-[#102B08] px-5 py-4 text-white">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                        Community Support
                      </p>
                      <p className="mt-1 font-semibold">{feature.imageLabel}</p>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
