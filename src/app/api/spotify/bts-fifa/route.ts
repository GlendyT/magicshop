import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  // El state contiene el redirectUri exacto que el cliente envió a Spotify
  const stateParam = searchParams.get("state");

  // Origin de la request para redirecciones internas de vuelta a la app
  const appOrigin = request.nextUrl.origin;

  if (error) {
    return NextResponse.redirect(
      new URL("/bts-fifa-2026?tab=join&error=access_denied", appOrigin)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/bts-fifa-2026?tab=join&error=no_code", appOrigin)
    );
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Spotify credentials");
    }

    // Recuperar el redirect_uri exacto que se usó al iniciar el flujo.
    // Debe ser idéntico al que Spotify recibió, de lo contrario lanzará error.
    const redirectUri = stateParam
      ? decodeURIComponent(stateParam)
      : `${appOrigin}/api/spotify/bts-fifa`;

    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error(
        "[BTS FIFA] Spotify token error:",
        tokenResponse.status,
        errorData
      );
      throw new Error(`Failed to get access token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();

    // Redirigir al usuario de vuelta al formulario con el token
    const redirectUrl = new URL("/bts-fifa-2026", appOrigin);
    redirectUrl.searchParams.set("tab", "join");
    redirectUrl.searchParams.set("access_token", tokenData.access_token);

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("[BTS FIFA] Auth error:", err);
    return NextResponse.redirect(
      new URL("/bts-fifa-2026?tab=join&error=auth_failed", appOrigin)
    );
  }
}
