import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const tokenOnly = searchParams.get('token_only');

  // Nueva funcionalidad para obtener solo el token de cliente
  if (tokenOnly === 'true') {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
      });

      const data = await response.json();
      return NextResponse.json({ token: data.access_token });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to get token', errorDetails: error}, { status: 500 });
    }
  }

  if (error) {
    return NextResponse.redirect(new URL('/spotify/playlistgenerator?error=access_denied', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/spotify/playlistgenerator?error=no_code', request.url));
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/spotify/auth`;

    if (!clientId || !clientSecret) {
      throw new Error('Missing Spotify credentials');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Spotify token error:', response.status, errorData);
      throw new Error(`Failed to get access token: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if redirect_uri contains arirang to determine destination
    const isArirangRequest = redirectUri.includes('/arirang');
    const redirectUrl = new URL(isArirangRequest ? '/arirang' : '/spotify/playlistgenerator', request.url);
    
    redirectUrl.searchParams.set('access_token', data.access_token);
    redirectUrl.searchParams.set('refresh_token', data.refresh_token);
    
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.redirect(new URL('/spotify/playlistgenerator?error=auth_failed', request.url));
  }
}
