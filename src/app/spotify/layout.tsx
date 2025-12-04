"use client";
import { SpotifyProvider } from "@/context/SpotifyProvider";
import { Suspense } from "react";
import { FiLoader } from "react-icons/fi";

export const dynamic = `force-dynamic`

function SpotifyProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center">
          <FiLoader className=" animate-spin " />
          Loading...
        </div>
      }
    >
      <SpotifyProvider>{children}</SpotifyProvider>
    </Suspense>
  );
}

export default function SpotifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpotifyProviderWrapper>{children}</SpotifyProviderWrapper>;
}
