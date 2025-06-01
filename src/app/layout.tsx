import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next"
import "./globals.css";
import { DownloadProvider } from "@/context/DownloadProvider";
import { ImageCropProvider } from "@/context/ImageCropProvider";
import { RequestInfoProvider } from "@/context/RequestInfoProvider";
import { PhotoBoothProvider } from "@/context/PhotoboothProvider";
import { FlipProvider } from "@/context/FlipProvider";
import { FishProvider } from "@/context/FishProvider";
import { RPSProvider } from "@/context/RPSProvider";
import { DarkProvider } from "@/context/DarkModeProvider";
import Sidebar from "@/utils/Sidebar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { TicTacToeProvider } from "@/context/TicTacToeProvider";

export const metadata: Metadata = {
  title: "The Magic Shop",
  description: "Created by ARMY for ARMY and BTS",
  icons: {
    icon: "/Polaroid/Only-graphic-darkpurple.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const analyticsId = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_VERCEL_ANALYTICS : process.env.NEXT_PUBLIC_NETLIFY_ANALYTICS;

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <DarkProvider>
          <DownloadProvider>
            <RequestInfoProvider>
              <ImageCropProvider>
                <PhotoBoothProvider>
                  <FlipProvider>
                    <FishProvider>
                      <RPSProvider>
                        <TicTacToeProvider>
                          <Sidebar />
                          {children}
                          <GoogleAnalytics gaId={analyticsId!} />
                          <SpeedInsights />
                          <Analytics /></TicTacToeProvider>
                      </RPSProvider>
                    </FishProvider>
                  </FlipProvider>
                </PhotoBoothProvider>
              </ImageCropProvider>
            </RequestInfoProvider>
          </DownloadProvider>
        </DarkProvider>
      </body>
    </html>
  );
}
