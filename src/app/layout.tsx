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
                        <Sidebar />
                        {children}
                        <GoogleAnalytics gaId="G-HZD5D4VHSX" />
                        <SpeedInsights />
                        <Analytics />
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
