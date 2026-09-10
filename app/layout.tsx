import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

// One sans family across the site (display + body), one mono for labels and data.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
});

const plexSansBody = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Lucid — Competition Mathematics Academy · AMC · AIME · USAMO · IMO",
  description:
    "A complete digital learning ecosystem for competition mathematics: interactive lessons, adaptive practice, mock contests, and AI coaching from AMC 8 through the IMO.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='13' fill='none' stroke='%23D3DCE8' stroke-width='2'/%3E%3Cpath d='M16 6 L25.5 22 L6.5 22 Z' fill='none' stroke='%232563EB' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexSansBody.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
