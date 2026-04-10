import { painPoints } from "@/data/landing-content";
import { SectionTitle } from "@/components/shared/section-title";

export function ProblemsSection() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionTitle title="Masalah yang Sering Dihadapi" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {painPoints.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="card-base group p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:shadow-[0_24px_60px_rgba(23,57,1,0.18)]"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-surface"
                  style={{ backgroundColor: "#DDE6D1", color: "#173901" }}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-primary transition-colors duration-300 group-hover:text-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-textSoft transition-colors duration-300 group-hover:text-surface/80">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
