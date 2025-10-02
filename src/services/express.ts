import { SpotifyAlbum, SpotifyArtist, SpotifyData, SpotifyTrack } from "@/types/types.spotify";



export async function getTokenSpotify(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials are missing from environment variables');
  }

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

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
    throw new Error(`Failed to fetch Spotify token: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  return data.access_token;
}
// Función utilitaria para hacer delay entre peticiones
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Función utilitaria para hacer peticiones con retry logic
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(15000)
      });
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000;
        
        if (attempt === maxRetries) {
          throw new Error(`Rate limit exceeded after ${maxRetries} attempts`);
        }
        
        await delay(waitTime);
        continue;
      }
      
      if (response.status === 401) {
        throw new Error('Unauthorized - Token may be expired');
      }
      
      return response;
    } catch (error) {
      console.error(`Fetch attempt ${attempt}/${maxRetries} failed for ${url}:`, error);
      if (attempt === maxRetries) {
        throw error;
      }
      await delay(2000 * attempt);
    }
  }
  
  throw new Error('Max retries exceeded');
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
    console.error('Error getting all artist tracks:', error);
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
        } catch (error) {
          console.error(`Error getting tracks for album ${album.name}:`, error);
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
    console.error('Error getting albums with tracks:', error);
    throw error;
  }
}

export async function getArtistData(token: string, artistName: string): Promise<SpotifyData | null> {
  try {
    const artist = await searchArtist(token, artistName);
    
    if (!artist) {
      return null;
    }

    const [albums, topTracks, allTracks, albumsWithTracks] = await Promise.all([
      getArtistAlbums(token, artist.id),
      getArtistTopTracks(token, artist.id),
      getAllArtistTracks(token, artist.id),
      getAlbumsWithTracks(token, artist.id)
    ]);

    return {
      artist,
      albums: albums || [],
      albumsWithTracks: albumsWithTracks || [],
      topTracks: topTracks || [],
      allTracks: allTracks || []
    };
  } catch (error) {
    console.error(`Error getting data for ${artistName}:`, error);
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
// Función rápida para información básica del artista
export async function getBasicArtistData(token: string, artistId: string): Promise<SpotifyData | null> {
  try {
    const [artist, albums, topTracks] = await Promise.all([
      getArtistById(token, artistId),
      getAllArtistAlbums(token, artistId),
      getArtistTopTracks(token, artistId)
    ]);
    
    if (!artist) {
      return null;
    }

    return {
      artist,
      albums: albums || [],
      albumsWithTracks: [],
      topTracks: topTracks || [],
      allTracks: []
    };
  } catch (error) {
    console.error(`Error getting basic data for artist ID ${artistId}:`, error);
    return null;
  }
}

export async function getMultipleBasicArtistData(token: string, artistIds: string[]): Promise<Record<string, SpotifyData>> {
  try {
    const artists = await getMultipleArtists(token, artistIds);
    const result: Record<string, SpotifyData> = {};
    
    for (const artist of artists) {
      const [albums, topTracks] = await Promise.all([
        getAllArtistAlbums(token, artist.id),
        getArtistTopTracks(token, artist.id)
      ]);
      
      result[artist.id] = {
        artist,
        albums: albums || [],
        albumsWithTracks: [],
        topTracks: topTracks || [],
        allTracks: []
      };
    }
    
    return result;
  } catch (error) {
    console.error('Error getting multiple basic artist data:', error);
    throw error;
  }
}
// Función completa (original) para la página de detalles
export async function getArtistDataById(token: string, artistId: string): Promise<SpotifyData | null> {
  try {
    // Get fresh token if needed
    let currentToken = token;
    
    const artist = await getArtistById(currentToken, artistId);
    
    if (!artist) {
      return null;
    }

    const [albums, topTracks, allTracks, albumsWithTracks] = await Promise.all([
      getArtistAlbums(currentToken, artist.id),
      getArtistTopTracks(currentToken, artist.id),
      getAllArtistTracks(currentToken, artist.id),
      getAlbumsWithTracks(currentToken, artist.id)
    ]);

    return {
      artist,
      albums: albums || [],
      albumsWithTracks: albumsWithTracks || [],
      topTracks: topTracks || [],
      allTracks: allTracks || []
    };
  } catch (error) {
    console.error(`Error getting data for artist ID ${artistId}:`, error);
    
    // Try with fresh token if unauthorized
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      try {
        const freshToken = await getTokenSpotify();
        return await getArtistDataById(freshToken, artistId);
      } catch (retryError) {
        console.error('Retry with fresh token failed:', retryError);
        return null;
      }
    }
    
    return null;
  }
}


