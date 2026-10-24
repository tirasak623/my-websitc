interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl mb-10 ${alignClass}`}>
      {eyebrow && (
        <p className="text-orange-dark font-semibold tracking-wide uppercase text-sm mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-charcoal">{title}</h2>
      {description && (
        <p className="mt-3 text-charcoal/70 text-base md:text-lg">{description}</p>
      )}
    </div>
  );
}
