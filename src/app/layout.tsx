import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
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
import { TetrisProvider } from "@/context/TetrisProvider";
import Contact from "@/utils/Contact";
import { SpotifyProvider } from "@/context/SpotifyProvider";

export const metadata: Metadata = {
  title: "The Magic Shop",
  description: "Created by ARMY for ARMY and BTS",
  icons: {
    icon: "/Polaroid/Only-graphic-darkpurple.webp",
  },
  other: {
    "google-adsense-account": "ca-pub-8740228129799106",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8740228129799106" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8740228129799106"
          crossOrigin="anonymous"
        ></script>
      </head>
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
                          <TetrisProvider>
                            
                              <Sidebar />

                              {children}
                              <Contact />
                              <GoogleAnalytics gaId="G-3SC31S5CBD" />
                              <SpeedInsights />
                              <Analytics />
                            
                          </TetrisProvider>
                        </TicTacToeProvider>
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
