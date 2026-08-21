import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { CursorGlow } from "@/components/CursorGlow";
import { LoadingScreen } from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "SVNCTM | Every Space, a Sanctum",
  description: "Thoughtfully designed objects for slower moments, softer spaces, and everyday rituals. SVNCTM creates design objects that happen to smell incredible.",
  keywords: "candles, design objects, lifestyle brand, scented candles, home fragrance",
  openGraph: {
    title: "SVNCTM | Every Space, a Sanctum",
    description: "Thoughtfully designed objects for slower moments, softer spaces, and everyday rituals.",
    type: "website",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-svnctm-white-warm">
        <CartProvider><LoadingScreen /><CursorGlow /><Header />
        <main className="flex-1">{children}</main>
        <Footer /></CartProvider>
      </body>
    </html>
  );
}
