"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { submitEnquiry } from "@/app/book/actions";

const SLOTS = [
  { value: "morning", label: "Morning", hint: "9 – 12" },
  { value: "afternoon", label: "Afternoon", hint: "12 – 4" },
  { value: "evening", label: "Evening", hint: "4 – 8" },
];

const DESTINATIONS = [
  "Meghalaya",
  "Arunachal Pradesh",
  "Assam",
  "Nagaland",
  "Sikkim",
  "Manipur",
  "Mizoram",
  "Tripura",
  "A multi-state itinerary",
  "Still deciding",
];

const TRAVELLERS = ["1 traveller", "2 travellers", "3 – 4", "5 – 8", "9 or more"];

const WINDOWS = [
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "Dates are flexible",
];

const BUDGETS = [
  "Under ₹50,000 per person",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "Above ₹2,00,000",
  "Prefer to discuss",
];

const INPUT =
  "w-full border-b border-hairline bg-transparent py-3 font-light text-foreground outline-none transition-colors duration-300 placeholder:text-muted/50 focus:border-accent";

const LABEL =
  "block text-[10px] font-light uppercase tracking-[0.22em] text-muted";

const SELECT = `${INPUT} appearance-none pr-8 [&>option]:bg-background [&>option]:text-foreground`;

function Legend({ index, children }) {
  return (
    <legend className="mb-8 flex items-baseline gap-4">
      <span className="text-[10px] font-light tracking-[0.28em] text-accent">
        {index}
      </span>
      <span className="font-display text-[22px] leading-none tracking-[0.02em] md:text-2xl">
        {children}
      </span>
    </legend>
  );
}

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 text-[11px] font-light tracking-[0.06em] text-danger">
      {children}
    </p>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 8"
      className="pointer-events-none absolute right-0 bottom-4 w-3 text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M1 1l5 5 5-5" />
    </svg>
  );
}

export default function EnquiryForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiry, {
    errors: {},
    values: {},
  });

  const uid = useId();
  const field = (name) => `${uid}-${name}`;
  const err = (name) => state.errors?.[name];
  const describedBy = (name) => (err(name) ? `${uid}-${name}-error` : undefined);
  const prev = (name, fallback = "") => state.values?.[name] ?? fallback;

  // The earliest selectable day follows the visitor's clock, not the build
  // machine's. Written straight to the node so it never touches render.
  const earliestDay = (node) => {
    if (!node) return;
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    node.min = now.toISOString().slice(0, 10);
  };

  if (state.ok) {
    return (
      <div className="border border-hairline px-7 py-16 text-center md:px-14 md:py-24">
        <span
          aria-hidden
          className="mx-auto grid size-14 place-items-center rounded-full border border-accent text-accent"
        >
          <svg viewBox="0 0 20 20" className="w-5" fill="none" stroke="currentColor">
            <path d="M4 10.5l4 4 8-9" strokeWidth="1" />
          </svg>
        </span>

        <h2 className="font-display mt-8 text-3xl leading-tight tracking-[0.01em] md:text-4xl">
          {state.name ? `Thank you, ${state.name.split(" ")[0]}.` : "Thank you."}
        </h2>

        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed font-light text-muted">
          Your request has reached us. A curator will confirm your
          {state.slot ? ` ${state.slot} ` : " "}
          call and share a short note beforehand — usually within one working day.
        </p>

        <span aria-hidden className="mx-auto mt-10 block h-px w-16 bg-hairline" />

        <Link
          href="/"
          className="mt-10 inline-block text-[10.5px] font-light tracking-[0.22em] text-muted uppercase transition-colors duration-300 hover:text-accent"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-16">
      {/* Bot bait — hidden from people, ignored by assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor={field("company")}>Company</label>
        <input id={field("company")} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <Legend index="01">Your details</Legend>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor={field("name")} className={LABEL}>
              Full name
            </label>
            <input
              id={field("name")}
              name="name"
              defaultValue={prev("name")}
              autoComplete="name"
              placeholder="Ananya Sharma"
              aria-invalid={!!err("name")}
              aria-describedby={describedBy("name")}
              className={INPUT}
            />
            <FieldError id={describedBy("name")}>{err("name")}</FieldError>
          </div>

          <div>
            <label htmlFor={field("email")} className={LABEL}>
              Email
            </label>
            <input
              id={field("email")}
              name="email"
              type="email"
              inputMode="email"
              defaultValue={prev("email")}
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!err("email")}
              aria-describedby={describedBy("email")}
              className={INPUT}
            />
            <FieldError id={describedBy("email")}>{err("email")}</FieldError>
          </div>

          <div>
            <label htmlFor={field("phone")} className={LABEL}>
              Telephone
            </label>
            <div className="flex items-end gap-3">
              <input
                name="dial"
                defaultValue={prev("dial", "+91")}
                aria-label="Country code"
                className={`${INPUT} w-16 shrink-0`}
              />
              <input
                id={field("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                defaultValue={prev("phone")}
                autoComplete="tel"
                placeholder="98765 43210"
                aria-invalid={!!err("phone")}
                aria-describedby={describedBy("phone")}
                className={INPUT}
              />
            </div>
            <FieldError id={describedBy("phone")}>{err("phone")}</FieldError>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <Legend index="02">The call</Legend>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <label htmlFor={field("date")} className={LABEL}>
              Preferred day
            </label>
            <input
              id={field("date")}
              name="date"
              type="date"
              ref={earliestDay}
              defaultValue={prev("date")}
              aria-invalid={!!err("date")}
              aria-describedby={describedBy("date")}
              className={`${INPUT} [&::-webkit-calendar-picker-indicator]:opacity-40`}
            />
            <FieldError id={describedBy("date")}>{err("date")}</FieldError>
          </div>
          <br />
          <fieldset>
            <legend className={`${LABEL} mb-3`}>Preferred window (IST)</legend>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map(({ value, label, hint }) => (
                <label key={value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="slot"
                    value={value}
                    defaultChecked={prev("slot") === value}
                    className="peer sr-only"
                  />
                  <span className="block border border-hairline px-2 py-2.5 text-center transition-colors duration-300 peer-checked:border-accent peer-checked:text-accent peer-focus-visible:border-accent">
                    <span className="block text-[10px] font-light tracking-[0.14em] uppercase">
                      {label}
                    </span>
                    <span className="mt-1 block text-[10px] font-light text-muted">
                      {hint}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <FieldError id={describedBy("slot")}>{err("slot")}</FieldError>
          </fieldset>
        </div>
      </fieldset>

      <fieldset>
        <Legend index="03">Your journey</Legend>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="relative">
            <label htmlFor={field("destination")} className={LABEL}>
              Where to
            </label>
            <select
              id={field("destination")}
              name="destination"
              defaultValue={prev("destination")}
              className={SELECT}
            >
              <option value="">Select a region</option>
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <Chevron />
          </div>

          <div className="relative">
            <label htmlFor={field("travellers")} className={LABEL}>
              Party size
            </label>
            <select
              id={field("travellers")}
              name="travellers"
              defaultValue={prev("travellers")}
              className={SELECT}
            >
              <option value="">Select</option>
              {TRAVELLERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Chevron />
          </div>

          <div className="relative">
            <label htmlFor={field("window")} className={LABEL}>
              When
            </label>
            <select
              id={field("window")}
              name="window"
              defaultValue={prev("window")}
              className={SELECT}
            >
              <option value="">Select</option>
              {WINDOWS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            <Chevron />
          </div>

          <div className="relative">
            <label htmlFor={field("budget")} className={LABEL}>
              Indicative budget
            </label>
            <select
              id={field("budget")}
              name="budget"
              defaultValue={prev("budget")}
              className={SELECT}
            >
              <option value="">Select</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <Chevron />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={field("notes")} className={LABEL}>
              Anything we should know
            </label>
            <textarea
              id={field("notes")}
              name="notes"
              rows={4}
              maxLength={1200}
              defaultValue={prev("notes")}
              placeholder="Occasions, pace, dietary needs, places you've long wanted to see…"
              aria-invalid={!!err("notes")}
              aria-describedby={describedBy("notes")}
              className={`${INPUT} resize-none leading-relaxed`}
            />
            <FieldError id={describedBy("notes")}>{err("notes")}</FieldError>
          </div>
        </div>
      </fieldset>

      <div className="border-hairline">
        <div>
          <label className="flex cursor-pointer items-start gap-3.5">
            <input
              type="checkbox"
              name="consent"
              defaultChecked={!!prev("consent")}
              aria-invalid={!!err("consent")}
              aria-describedby={describedBy("consent")}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="mt-0.5 grid size-4 shrink-0 place-items-center border border-hairline text-transparent transition-colors duration-300 peer-checked:border-accent peer-checked:text-accent peer-focus-visible:border-accent"
            >
              <svg viewBox="0 0 12 12" className="w-2.5" fill="none" stroke="currentColor">
                <path d="M2 6.5l2.5 2.5L10 3" strokeWidth="1.5" />
              </svg>
            </span>
            <span className="text-[12.5px] leading-relaxed font-light text-muted">
              I&apos;m happy for TRAV TRAILS to contact me about this enquiry.
            </span>
          </label>
          <FieldError id={describedBy("consent")}>{err("consent")}</FieldError>
        </div>

        <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-light tracking-[0.06em] text-muted">
            No obligation. We reply within one working day.
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer w-full border border-foreground bg-foreground px-10 py-4 text-[10.5px] font-light tracking-[0.26em] text-background uppercase transition-colors duration-500 hover:border-accent hover:bg-accent disabled:opacity-55 sm:w-auto"
          >
            {isPending ? "Sending…" : "Request the call"}
          </button>
        </div>
      </div>
    </form>
  );
}
