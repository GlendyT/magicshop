"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SpotifyAuthHandlerProps {
  onTokenReceived: (token: string) => void;
}

export function SpotifyAuthHandler({ onTokenReceived }: SpotifyAuthHandlerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get token from URL
    const token = searchParams.get("access_token");
    if (token) {
      onTokenReceived(token);
    }
  }, [searchParams, onTokenReceived]);

  return null;
}
