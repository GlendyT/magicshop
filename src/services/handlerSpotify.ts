import { SpotifyAlbum, SpotifyArtist, SpotifyData, SpotifyTrack } from "@/types/types.spotify";

// Cache en memoria para el token de Spotify
let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

export async function getTokenSpotify(): Promise<string> {
  // Verificar si tenemos un token válido en cache
  const now = Date.now();
  if (cachedToken && tokenExpiresAt > now) {
    return cachedToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials are missing from environment variables');
  }

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetchWithRetry(`${process.env.SPOTIFY_TOKEN_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new SpotifyFetchError(`Failed to fetch Spotify token: ${response.status} - ${errorData}`, response.status);
    }

    const data = await response.json();
    
    // Cachear el token (expira en 3600 segundos - 1 hora)
    // Renovar 5 minutos antes para evitar que expire durante uso
    cachedToken = data.access_token;
    tokenExpiresAt = now + ((data.expires_in - 300) * 1000);
    
    return data.access_token;
  } catch (error) {
    if (error instanceof SpotifyFetchError && error.isNetworkError) {
      throw new Error('Unable to connect to Spotify. Please check your internet connection.');
    }
    throw error;
  }
}
// Función utilitaria para hacer delay entre peticiones
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Tipo de error personalizado para mejor manejo
class SpotifyFetchError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isNetworkError: boolean = false
  ) {
    super(message);
    this.name = 'SpotifyFetchError';
  }
}

// Función utilitaria para hacer peticiones con retry logic
async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  maxRetries = 3,
  silent = false
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(15000)
      });
      
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000;
        
        if (attempt === maxRetries) {
          throw new SpotifyFetchError('Rate limit exceeded', 429);
        }
        
        await delay(waitTime);
        continue;
      }
      
      // Handle authentication errors
      if (response.status === 401) {
        throw new SpotifyFetchError('Unauthorized - Token may be expired', 401);
      }
      
      return response;
    } catch (error) {
      lastError = error as Error;
      
      // Detectar errores de red (timeout, connection refused, etc.)
      const isNetworkError = 
        error instanceof TypeError || 
        (error as unknown as { code?: string })?.code === 'UND_ERR_CONNECT_TIMEOUT' ||
        (error as unknown as { cause?: { code?: string } })?.cause?.code === 'UND_ERR_CONNECT_TIMEOUT';
      
      // Solo loguear en el último intento y solo si no es modo silencioso
      if (attempt === maxRetries && !silent) {
        if (isNetworkError) {
          console.error(`[Spotify API] Network error after ${maxRetries} attempts: ${url.includes('accounts.spotify.com') ? 'Authentication' : 'API'} service unavailable`);
        } else {
          console.error(`[Spotify API] Request failed after ${maxRetries} attempts:`, error instanceof Error ? error.message : error);
        }
      }
      
      if (attempt === maxRetries) {
        throw new SpotifyFetchError(
          isNetworkError ? 'Network connection failed' : 'Request failed',
          undefined,
          isNetworkError
        );
      }
      
      // Backoff exponencial
      await delay(1000 * Math.pow(2, attempt - 1));
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

export async function searchArtist(token: string, artistName: string): Promise<SpotifyArtist | null> {
  const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to search for ${artistName}: ${response.status}`);
  }

  const data = await response.json();
  return data.artists.items[0];
}

export async function getArtistAlbums(token: string, artistId: string): Promise<SpotifyAlbum[]> {
  const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/artists/${artistId}/albums?include_groups=album&market=US&limit=20`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get artist albums: ${response.status}`);
  }

  const data = await response.json();
  return data.items;
}

export async function getArtistTopTracks(token: string, artistId: string): Promise<SpotifyTrack[]> {
  const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get top tracks: ${response.status}`);
  }

  const data = await response.json();
  return data.tracks;
}

export async function getAllArtistAlbums(token: string, artistId: string): Promise<SpotifyAlbum[]> {
  const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/artists/${artistId}/albums?include_groups=album,single&market=US&limit=50`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get all albums: ${response.status}`);
  }

  const data = await response.json();
  return data.items;
}

export async function getAlbumTracks(token: string, albumId: string): Promise<SpotifyTrack[]> {
  await delay(50); // Reducido el delay
  
  const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/albums/${albumId}/tracks?market=US`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get album tracks: ${response.status}`);
  }

  const data = await response.json();
  return data.items;
}

export async function getMultipleTracks(token: string, trackIds: string[]): Promise<SpotifyTrack[]> {
  if (trackIds.length === 0) return [];
  
  const chunks = [];
  for (let i = 0; i < trackIds.length; i += 50) {
    chunks.push(trackIds.slice(i, i + 50));
  }

  const allTracks = [];
  for (const chunk of chunks) {
    await delay(100); // Reducido el delay
    
    const idsString = chunk.join(',');
    const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/tracks?ids=${idsString}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get multiple tracks: ${response.status}`);
    }

    const data = await response.json();
    allTracks.push(...data.tracks);
  }

  return allTracks;
}

export async function getAllArtistTracks(token: string, artistId: string): Promise<SpotifyTrack[]> {
  try {
    const albums = await getAllArtistAlbums(token, artistId);
    
    const batchSize = 5;
    const allTrackPromises = [];
    
    for (let i = 0; i < albums.length; i += batchSize) {
      const batch = albums.slice(i, i + batchSize);
      const batchPromises = batch.map((album: SpotifyAlbum) => getAlbumTracks(token, album.id));
      allTrackPromises.push(...batchPromises);
      
      if (i + batchSize < albums.length) {
        await delay(500);
      }
    }
    
    const albumTracks = await Promise.all(allTrackPromises);
    const allTracks = albumTracks.flat();
    const uniqueTrackIds = [...new Set(allTracks.map((track: SpotifyTrack) => track.id))];
    
    const detailedTracks = await getMultipleTracks(token, uniqueTrackIds);
    
    return detailedTracks.filter((track: SpotifyTrack | null): track is SpotifyTrack => track !== null);
  } catch (error) {
    console.error('[Spotify] Failed to get all artist tracks');
    throw error;
  }
}

export async function getAlbumsWithTracks(token: string, artistId: string): Promise<SpotifyAlbum[]> {
  try {
    const albums = await getAllArtistAlbums(token, artistId);
    
    const albumsWithTracks = [];
    const batchSize = 3; // Reducido para ser más rápido
    
    for (let i = 0; i < albums.length; i += batchSize) {
      const batch = albums.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (album: SpotifyAlbum) => {
        try {
          await delay(50); // Reducido el delay
          
          const tracks = await getAlbumTracks(token, album.id);
          
          if (tracks.length > 0) {
            const trackIds = tracks.map((track: SpotifyTrack) => track.id);
            const detailedTracks = await getMultipleTracks(token, trackIds);
            
            return {
              ...album,
              tracks: detailedTracks.filter((track: SpotifyTrack | null): track is SpotifyTrack => track !== null)
            };
          } else {
            return {
              ...album,
              tracks: []
            };
          }
        } catch {
          // Silently return album without tracks on error
          return {
            ...album,
            tracks: []
          };
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      albumsWithTracks.push(...batchResults);
      
      if (i + batchSize < albums.length) {
        await delay(100); // Delay entre batches
      }
    }
    
    return albumsWithTracks;
  } catch (error) {
    console.error('[Spotify] Failed to get albums with tracks');
    throw error;
  }
}

export async function getArtistData(token: string, artistName: string): Promise<SpotifyData | null> {
  try {
    const artist = await searchArtist(token, artistName);
    
    if (!artist) {
      return null;
    }

    // Usar allSettled para que un fallo no cancele todo
    const results = await Promise.allSettled([
      getArtistAlbums(token, artist.id),
      getArtistTopTracks(token, artist.id),
      getAllArtistTracks(token, artist.id),
      getAlbumsWithTracks(token, artist.id)
    ]);

    return {
      artist,
      albums: results[0].status === 'fulfilled' ? results[0].value : [],
      topTracks: results[1].status === 'fulfilled' ? results[1].value : [],
      allTracks: results[2].status === 'fulfilled' ? results[2].value : [],
      albumsWithTracks: results[3].status === 'fulfilled' ? results[3].value : []
    };
  } catch {
    // Silently return null on error
    return null;
  }
}

export async function getArtistById(token: string, artistId: string): Promise<SpotifyArtist> {
  const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/artists/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get artist by ID ${artistId}: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getMultipleArtists(token: string, artistIds: string[]): Promise<SpotifyArtist[]> {
  if (artistIds.length === 0) return [];
  
  const chunks = [];
  for (let i = 0; i < artistIds.length; i += 50) {
    chunks.push(artistIds.slice(i, i + 50));
  }

  const allArtists = [];
  for (const chunk of chunks) {
    const idsString = chunk.join(',');
    const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/artists?ids=${idsString}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get multiple artists: ${response.status}`);
    }

    const data = await response.json();
    allArtists.push(...data.artists);
  }

  return allArtists;
}

// OAuth functions for user authentication
export async function getUserProfile(accessToken: string): Promise<{ id: string; display_name: string; email: string }> {
  const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get user profile: ${response.status}`);
  }

  return await response.json();
}

export async function createPlaylist(
  accessToken: string,
  userId: string,
  name: string,
  description: string = '',
  isPublic: boolean = false
): Promise<{ id: string; external_urls: { spotify: string } }> {
  const response = await fetchWithRetry(`${process.env.SPOTIFY_ENDPOINT_URL}/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      public: isPublic,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create playlist: ${response.status}`);
  }

  return await response.json();
}

export async function addTracksToPlaylist(
  accessToken: string,
  playlistId: string,
  trackUris: string[]
): Promise<void> {
  // Spotify allows max 100 tracks per request
  const chunks = [];
  for (let i = 0; i < trackUris.length; i += 100) {
    chunks.push(trackUris.slice(i, i + 100));
  }

  for (const chunk of chunks) {
    const response = await fetchWithRetry(
      `${process.env.SPOTIFY_ENDPOINT_URL}/playlists/${playlistId}/tracks`,
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

    if (!response.ok) {
      throw new Error(`Failed to add tracks to playlist: ${response.status}`);
    }

    await delay(100);
  }
}

// Función rápida para información básica del artista
export async function getBasicArtistData(token: string, artistId: string): Promise<SpotifyData | null> {
  try {
    const results = await Promise.allSettled([
      getArtistById(token, artistId),
      getAllArtistAlbums(token, artistId),
      getArtistTopTracks(token, artistId)
    ]);
    
    if (results[0].status !== 'fulfilled' || !results[0].value) {
      return null;
    }

    return {
      artist: results[0].value,
      albums: results[1].status === 'fulfilled' ? results[1].value : [],
      albumsWithTracks: [],
      topTracks: results[2].status === 'fulfilled' ? results[2].value : [],
      allTracks: []
    };
  } catch {
    // Silently return null on error
    return null;
  }
}

export async function getMultipleBasicArtistData(token: string, artistIds: string[]): Promise<Record<string, SpotifyData>> {
  try {
    const artists = await getMultipleArtists(token, artistIds);
    
    // Procesar artistas en paralelo con allSettled
    const artistDataPromises = artists.map(async (artist) => {
      const results = await Promise.allSettled([
        getAllArtistAlbums(token, artist.id),
        getArtistTopTracks(token, artist.id)
      ]);
      
      return {
        id: artist.id,
        data: {
          artist,
          albums: results[0].status === 'fulfilled' ? results[0].value : [],
          albumsWithTracks: [],
          topTracks: results[1].status === 'fulfilled' ? results[1].value : [],
          allTracks: []
        }
      };
    });
    
    const artistDataResults = await Promise.allSettled(artistDataPromises);
    
    const result: Record<string, SpotifyData> = {};
    artistDataResults.forEach((promiseResult) => {
      if (promiseResult.status === 'fulfilled') {
        const { id, data } = promiseResult.value;
        result[id] = data;
      }
    });
    
    return result;
  } catch (error) {
    console.error('[Spotify] Failed to get multiple basic artist data');
    throw error;
  }
}
// Función completa (original) para la página de detalles
export async function getArtistDataById(token: string, artistId: string): Promise<SpotifyData | null> {
  try {
    // Get fresh token if needed
    const currentToken = token;
    
    const artist = await getArtistById(currentToken, artistId);
    
    if (!artist) {
      return null;
    }

    const results = await Promise.allSettled([
      getArtistAlbums(currentToken, artist.id),
      getArtistTopTracks(currentToken, artist.id),
      getAllArtistTracks(currentToken, artist.id),
      getAlbumsWithTracks(currentToken, artist.id)
    ]);

    return {
      artist,
      albums: results[0].status === 'fulfilled' ? results[0].value : [],
      topTracks: results[1].status === 'fulfilled' ? results[1].value : [],
      allTracks: results[2].status === 'fulfilled' ? results[2].value : [],
      albumsWithTracks: results[3].status === 'fulfilled' ? results[3].value : []
    };
  } catch (error) {
    console.error('[Spotify] Failed to get artist data by ID');
    
    // Try with fresh token if unauthorized
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      try {
        const freshToken = await getTokenSpotify();
        return await getArtistDataById(freshToken, artistId);
      } catch {
        // Silently return null on retry failure
        return null;
      }
    }
    
    return null;
  }
}


