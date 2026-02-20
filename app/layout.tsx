import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import {
  APP_NAME,
  getMetadataBase,
  METADATA_DESCRIPTION,
} from "@/app/config/metadata";
import { QueryProvider } from "@/app/providers";
import { BASE_PATH } from "@/shared/config/base-path";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: METADATA_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "React Query",
    "FSD",
    "BFF",
    "DIP",
    "Stock Dashboard",
    "Portfolio",
  ],
  alternates: {
    canonical: BASE_PATH,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: APP_NAME,
    title: APP_NAME,
    description: METADATA_DESCRIPTION,
    url: BASE_PATH,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: METADATA_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
