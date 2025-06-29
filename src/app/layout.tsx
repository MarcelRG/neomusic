import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "~/@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { AnimatedBackground } from "~/@/components/animated-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "neomusic - discover your new favorite songs",
  description:
    "Explore fresh, genre-specific tracks tailored to your unique musical taste.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "neomusic - discover your new favorite songs",
    description:
      "Explore fresh, genre-specific tracks tailored to your unique musical taste.",
    url: "https://www.neomusic.top",
    type: "website",
    images: ["/metaimg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable} relative`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AnimatedBackground />
            <TRPCReactProvider headers={headers()}>
              {children}
            </TRPCReactProvider>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
