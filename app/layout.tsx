import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import "easymde/dist/easymde.min.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MR Startups - Moroccan Startup Platform",
    template: "%s | MR Startups"
  },
  description: "Discover and showcase Moroccan startups. Connect entrepreneurs with opportunities in Morocco's growing startup ecosystem. Submit your startup, find investors, and grow your business.",
  keywords: [
    "Moroccan startups",
    "Morocco entrepreneurship",
    "startup platform",
    "Morocco business",
    "startup discovery",
    "Moroccan entrepreneurs",
    "startup ecosystem",
    "Morocco innovation",
    "startup pitch",
    "Morocco investment"
  ],
  authors: [{ name: "MR Startups Team" }],
  creator: "MR Startups",
  publisher: "MR Startups",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mr-startups.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mr-startups.vercel.app",
    title: "MR Startups - Moroccan Startup Platform",
    description: "Discover and showcase Moroccan startups. Connect entrepreneurs with opportunities in Morocco's growing startup ecosystem.",
    siteName: "MR Startups",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MR Startups - Moroccan Startup Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MR Startups - Moroccan Startup Platform",
    description: "Discover and showcase Moroccan startups. Connect entrepreneurs with opportunities in Morocco's growing startup ecosystem.",
    images: ["/og-image.jpg"],
    creator: "@mrstartups",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
