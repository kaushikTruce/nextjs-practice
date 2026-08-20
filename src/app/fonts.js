import { Instrument_Serif, Jost } from "next/font/google";

export const display = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const sans = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});
