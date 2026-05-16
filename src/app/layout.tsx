import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SITE } from "@/lib/constants";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${syne.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
