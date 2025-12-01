"use server";

// Clase personalizada para errores de autenticación
class SpotifyAuthError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public isAuthError: boolean = false
  ) {
    super(message);
    this.name = 'SpotifyAuthError';
  }
}

export async function createSpotifyPlaylist(
  accessToken: string,
  playlistName: string,
  trackUris: string[],
  description?: string
) {
  try {
    // Get user profile
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      // Detectar error 401 (token expirado/inválido)
      if (userResponse.status === 401) {
        throw new SpotifyAuthError(
          'Your session has expired. Please login again.',
          401,
          true
        );
      }
      
      const errorText = await userResponse.text();
      throw new SpotifyAuthError(
        `Failed to get user profile: ${errorText}`,
        userResponse.status
      );
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    // Create playlist
    const createResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          description: description || 'Created with BTS Playlist Generator',
          public: false,
        }),
      }
    );

    if (!createResponse.ok) {
      // Detectar error 401
      if (createResponse.status === 401) {
        throw new SpotifyAuthError(
          'Your session has expired. Please login again.',
          401,
          true
        );
      }
      
      const errorText = await createResponse.text();
      throw new SpotifyAuthError(
        `Failed to create playlist: ${errorText}`,
        createResponse.status
      );
    }

    const playlist = await createResponse.json();

    // Add tracks in chunks of 100 (Spotify limit)
    const chunks = [];
    for (let i = 0; i < trackUris.length; i += 100) {
      chunks.push(trackUris.slice(i, i + 100));
    }

    for (const chunk of chunks) {
      await fetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: chunk,
          }),
        }
      );
    }

    return {
      success: true,
      playlistId: playlist.id,
      playlistUrl: playlist.external_urls.spotify,
    };
  } catch (error) {
    // Solo loguear en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating playlist:', error);
    }
    throw error;
  }
}
