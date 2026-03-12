import type { Metadata, Viewport } from "next";
import "./globals.css";
import ScrollProvider from "@/hooks/ScrollProvider";
import ScrollToTop from "@/components/ScrollToTop";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Signsol Design",
  description: "High-impact signage solutions",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
  viewportFit: "cover",
};

import { PageTransitionProvider } from "@/components/PageTransition";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden lg:cursor-none`}>
        <Suspense fallback={null}>
          <PageTransitionProvider>
            <ScrollProvider>
              <Cursor />
              {children}
            </ScrollProvider>
          </PageTransitionProvider>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
