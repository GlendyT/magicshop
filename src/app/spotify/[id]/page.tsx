import { loadFullArtistData } from "@/services/spotify";
import ArtistDetailsClient from "./ArtistDetailsClient";

interface ArtistDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const ArtistDetails = async ({ params }: ArtistDetailsProps) => {
  const { id: artistId } = await params;

  const artistData = await loadFullArtistData(artistId);

  if (!artistData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist not found</h1>
          <p className="text-gray-300 mb-4">Unable to load artist data</p>
        </div>
      </div>
    );
  }

  return <ArtistDetailsClient artistData={artistData} />;
};

export default ArtistDetails;
