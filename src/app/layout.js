import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "TRAV TRAILS | Northeast India",
  description: "Curators of Unforgettable Travel Experiences and Lifelong Memories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
