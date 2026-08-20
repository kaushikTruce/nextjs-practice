import Navbar from "@/components/Navbar";
import { display, sans } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "TRAV TRAILS | Northeast India",
  description: "Curators of Unforgettable Travel Experiences and Lifelong Memories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
