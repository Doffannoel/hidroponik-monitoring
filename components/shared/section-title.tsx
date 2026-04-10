interface SectionTitleProps {
  title: string;
  align?: "left" | "center";
}

export function SectionTitle({ title, align = "center" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="section-heading text-primary">{title}</h2>
    </div>
  );
}
