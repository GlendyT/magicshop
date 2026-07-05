import { Disc, LogOut, Music2, Users } from "lucide-react";
import React from "react";

interface SpotifyUser {
  id: string;
  displayName: string;
  image?: string;
}

interface FormTeamProps {
  handleSubmit: (e: React.FormEvent) => void;
  formData: {
    spotifyUserId: string;
    spotifyUsername: string;
    album: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleConnectSpotify: () => void;
  handleDisconnectSpotify: () => void;
  spotifyUser: SpotifyUser | null;
  isConnecting: boolean;
  isSubmitting: boolean;
  error: string;
  success: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  albums: string[];
}

// Logo SVG de Spotify inline
const SpotifyLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const FormTeam = ({
  handleSubmit,
  formData,
  handleChange,
  handleConnectSpotify,
  handleDisconnectSpotify,
  spotifyUser,
  isConnecting,
  isSubmitting,
  error,
  success,
  setError,
  albums,
}: FormTeamProps) => {
  const isReadyToSubmit = !!spotifyUser && !!formData.album;

  return (
    <div className="flex justify-center items-center py-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/10 transition-all">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform rotate-3">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Choose Your Era
          </h2>
          <p className="text-neutral-300 text-sm">
            Connect your Spotify to join the global streaming playoffs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Spotify Connect */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              <Music2 className="w-4 h-4 text-[#1DB954]" />
              Spotify Account
            </label>

            {spotifyUser ? (
              /* Usuario ya conectado */
              <div className="flex items-center gap-3 bg-[#1DB954]/10 border border-[#1DB954]/30 rounded-xl px-4 py-3">
                {spotifyUser.image ? (
                  <img
                    src={spotifyUser.image}
                    alt={spotifyUser.displayName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#1DB954]/50"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                    <SpotifyLogo className="w-5 h-5 text-[#1DB954]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {spotifyUser.displayName}
                  </p>
                  <p className="text-[#1DB954] text-xs">Connected ✓</p>
                </div>
                <button
                  type="button"
                  onClick={handleDisconnectSpotify}
                  className="flex items-center gap-1 text-neutral-400 hover:text-red-400 text-xs transition-colors"
                  title="Disconnect Spotify"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              /* Botón de conectar */
              <button
                type="button"
                onClick={() => {
                  if (error) setError("");
                  handleConnectSpotify();
                }}
                disabled={isConnecting}
                className="w-full flex items-center justify-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-[#1DB954]/50 text-black font-bold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <SpotifyLogo className="w-5 h-5" />
                )}
                {isConnecting ? "Redirecting..." : "Connect with Spotify"}
              </button>
            )}
          </div>

          {/* Album/Team Field */}
          <div className="space-y-2 group">
            <label
              htmlFor="album"
              className="text-sm font-medium text-neutral-200 flex items-center gap-2"
            >
              <Disc className="w-4 h-4 text-emerald-400 group-focus-within:text-emerald-300 transition-colors" />
              Select Album (Team)
            </label>
            <div className="relative">
              <select
                id="album"
                name="album"
                value={formData.album}
                onChange={handleChange}
                required
                disabled={!spotifyUser}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-black/70 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="" disabled className="text-neutral-500">
                  {spotifyUser
                    ? "Choose your era..."
                    : "Connect Spotify first"}
                </option>
                {albums.map((a) => (
                  <option
                    key={a}
                    value={a}
                    className="bg-neutral-900 text-white"
                  >
                    {a}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                ▼
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-4 rounded-xl text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm p-4 rounded-xl text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ¡Te has unido exitosamente! Redirigiendo a Playoffs...
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isReadyToSubmit}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white font-bold py-4 px-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Join the Tournament
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormTeam;
