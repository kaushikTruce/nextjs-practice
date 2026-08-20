import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata = {
  title: "Schedule a Call | TRAV TRAILS",
  description:
    "Speak with a curator about a bespoke journey through Northeast India. A short, unhurried call — no obligation.",
};

const assurances = [
  {
    title: "A curator, not a call centre",
    body: "You speak with the person who will shape your itinerary.",
  },
  {
    title: "Twenty minutes, unhurried",
    body: "Enough to understand the journey you have in mind.",
  },
  {
    title: "Nothing owed",
    body: "Leave with a considered outline, whether or not you travel with us.",
  },
];

export default function BookPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Wordmark watermark, kept faint enough to read as texture. */}
      <Image
        src="/trav_trials.svg"
        alt=""
        aria-hidden
        width={1100}
        height={1100}
        priority={false}
        className="pointer-events-none absolute -top-24 -left-40 hidden w-[46rem] opacity-[0.035] select-none lg:block"
      />

      <div className="relative mx-auto grid max-w-[86rem] gap-16 px-5 pt-14 pb-24 md:px-8 md:pt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10 lg:pt-28 lg:pb-32">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[10px] font-light tracking-[0.32em] text-accent uppercase">
            Private consultation
          </p>

          <h1 className="font-display mt-7 text-[2.6rem] leading-[1.05] tracking-[0.01em] md:text-6xl">
            Let&apos;s begin with
            <br />
            <em className="italic">a conversation.</em>
          </h1>

          <span aria-hidden className="mt-9 block h-px w-14 bg-accent" />

          <p className="mt-9 max-w-md text-[15px] leading-[1.85] font-light text-muted">
            The finest journeys through the Northeast are rarely found in a
            brochure. Tell us a little about what you have in mind and we will
            call at a time that suits you.
          </p>

          <dl className="mt-14 border-t border-hairline">
            {assurances.map(({ title, body }) => (
              <div key={title} className="border-b border-hairline py-6">
                <dt className="text-[11px] font-light tracking-[0.18em] uppercase">
                  {title}
                </dt>
                <dd className="mt-2 text-[13.5px] leading-relaxed font-light text-muted">
                  {body}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-[12.5px] font-light text-muted">
            Would rather write?{" "}
            <Link
              href="/contact"
              className="text-foreground underline decoration-hairline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
            >
              Send us a note instead
            </Link>
            .
          </p>
        </aside>

        <section aria-label="Consultation request" className="lg:pt-3">
          <EnquiryForm />
        </section>
      </div>
    </main>
  );
}
