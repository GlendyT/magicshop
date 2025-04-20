import type { Metadata } from "next";
import "./globals.css";
import { DownloadProvider } from "@/context/DownloadProvider";
import { ImageCropProvider } from "@/context/ImageCropProvider";
import { RequestInfoProvider } from "@/context/RequestInfoProvider";
import { PhotoBoothProvider } from "@/context/PhotoboothProvider";
import { FlipProvider } from "@/context/FlipProvider";

export const metadata: Metadata = {
  title: "The Magic Shop",
  description: "Created by ARMY for ARMY and BTS",
  icons: {
    icon: "/Polaroid/Only-graphic-darkpurple.png",
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
        <DownloadProvider>
          <RequestInfoProvider>
            <ImageCropProvider>
              <PhotoBoothProvider>
                <FlipProvider>{children}</FlipProvider>
              </PhotoBoothProvider>
            </ImageCropProvider>
          </RequestInfoProvider>
        </DownloadProvider>
      </body>
    </html>
  );
}
