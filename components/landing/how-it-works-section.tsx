import { steps } from "@/data/landing-content";
import { SectionTitle } from "@/components/shared/section-title";

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="section-space">
      <div className="container-shell">
        <SectionTitle title="Bagaimana Tikus Kota Bekerja" />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {index < steps.length - 1 && (
                <span className="absolute left-[55%] top-7 hidden h-px w-[90%] border-t border-dashed border-primary/20 md:block" />
              )}
              <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white shadow-soft">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-primary">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-textSoft">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
