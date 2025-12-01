"use client";
import { SpotifyProvider } from "@/context/SpotifyProvider";
import { Suspense } from "react";

// Marcar como dinámico porque SpotifyProvider usa useSearchParams
export const dynamic = 'force-dynamic';

function SpotifyProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
