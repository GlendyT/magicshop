import { ArrowRight, Disc, Music, Users } from "lucide-react";
import React from "react";

interface FormTeamProps {
  handleSubmit: (e: React.FormEvent) => void;
  formData: {
    lastfm: string;
    album: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  isSubmitting: boolean;
  error: string;
  success: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  albums: string[];
}

const FormTeam = ({
  handleSubmit,
  formData,
  handleChange,
  isSubmitting,
  error,
  success,
  setError,
  albums,
}: FormTeamProps) => {
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
            Join an album team to participate in the global streaming playoffs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Last.fm Field */}
          <div className="space-y-2 group">
            <label
              htmlFor="lastfm"
              className="text-sm font-medium text-neutral-200 flex items-center gap-2"
            >
              <Music className="w-4 h-4 text-blue-400 group-focus-within:text-blue-300 transition-colors" />
              Last.fm Username
            </label>
            <input
              type="text"
              id="lastfm"
              name="lastfm"
              value={formData.lastfm}
              onChange={(e) => {
                if (error) setError("");
                handleChange(e);
              }}
              required
              placeholder="e.g. musiclover99"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-black/70"
            />
          </div>

          {/* Album Field */}
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
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all hover:bg-black/70"
              >
                <option value="" disabled className="text-neutral-500">
                  Choose your era...
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
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm p-4 rounded-xl text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ¡Te has unido exitosamente! Redirigiendo a Playoffs...
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 text-white font-bold py-4 px-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Join the Tournament
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormTeam;
