import { Navbar } from "@/components/statefull/navbar";
import { Footer } from "@/components/stateless/footer";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { ReduxProviders } from "@/redux/providers";
import { QueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import type { Metadata } from "next";
import "../styles/globals.css";
import { NextUIProviders, QueryProviders } from "./providers";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextUIProviders
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <ReduxProviders>
            <QueryProviders>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="container mx-auto flex-grow overflow-hidden">
                  {children}
                </main>
              </div>
              <Footer />
            </QueryProviders>
          </ReduxProviders>
        </NextUIProviders>
      </body>
    </html>
  );
}
