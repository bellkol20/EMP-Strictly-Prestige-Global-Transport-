type Props = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function PageHero({ title, description, eyebrow }: Props) {
  return (
    <section className="page-hero relative overflow-hidden text-[var(--paper)]">
      <div className="page-hero-overlay absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-32 md:px-8 md:pb-20">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brass-bright)]">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`font-display text-4xl md:text-5xl ${eyebrow ? "mt-4" : ""}`}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-[var(--mist)]">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
