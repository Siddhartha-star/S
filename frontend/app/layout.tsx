import type { Metadata } from "next";
import { Suspense } from "react";

import { inter, poppins } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { AuroraBackground } from "@/components/theme/AuroraBackground";
import { RouteTransition } from "@/components/providers/RouteTransition";
import { AppNav } from "@/components/layout/AppNav";
import "./globals.css";
import "sonner/dist/styles.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "SnapSearch Dashboard",
  description: "Futuristic SaaS workspace with role-based intelligence and dynamic theming.",
  metadataBase: new URL("https://snapsearch.app"),
  openGraph: {
    title: "SnapSearch",
    description: "A next-gen productivity cockpit with immersive gradients and AI assistance.",
    url: "https://snapsearch.app",
    siteName: "SnapSearch",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnapSearch dashboard preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white antialiased">
        <ThemeProvider>
          <AuthProvider>
            <div className="relative min-h-screen">
              <Suspense fallback={null}>
                <AuroraBackground />
              </Suspense>
              <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col gap-8 px-6 py-10 md:px-10">
                <AppNav />
                <RouteTransition>{children}</RouteTransition>
              </main>
            </div>
            <Toaster position="bottom-right" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

