import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/constants";
import { getProjectSummaries } from "@/lib/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — Portfolio`,
    template: `%s · ${profile.name}`,
  },
  description: profile.bio,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${profile.name} — Portfolio`,
    description: profile.bio,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Portfolio`,
    description: profile.bio,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = getProjectSummaries();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <Navbar projects={projects} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
