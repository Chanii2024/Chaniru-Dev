import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./global.css";
import { ToastProvider } from "@/context/ToastContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Chaniru Weerasinghe | System Administrator",
  description: "Portfolio of Chaniru Weerasinghe, System Administrator & Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full scroll-smooth antialiased`}>
      <body className="font-sans min-h-screen">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
