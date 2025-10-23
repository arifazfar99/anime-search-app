import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAnimeDetails } from "../features/anime/animeThunks";
import { ArrowLeft, Calendar, Loader2, Star, Tv, Users } from "lucide-react";

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedAnime, loading } = useAppSelector((state) => state.anime);

  useEffect(() => {
    if (id) dispatch(fetchAnimeDetails(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!selectedAnime) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white text-xl">Anime not found</p>
      </div>
    );
  }

  const defaultTitle = selectedAnime.titles?.find(
    (t) => t.type === "Default"
  )?.title;

  const englishTitle = selectedAnime.titles?.find(
    (t) => t.type === "English"
  )?.title;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="px-4 py-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Search
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={selectedAnime.images.jpg.large_image_url}
              alt={selectedAnime.titles[0].title}
              className="w-full rounded-lg shadow-2xl"
            />

            <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold text-white">
                  {selectedAnime.score}
                </span>
                <span className="text-slate-400 text-sm">
                  ({selectedAnime.scored_by?.toLocaleString()} users)
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rank</span>
                  <span className="text-white font-semibold">
                    #{selectedAnime.rank}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Popularity</span>
                  <span className="text-white font-semibold">
                    #{selectedAnime.popularity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Members</span>
                  <span className="text-white font-semibold">
                    {selectedAnime.members?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Favorites</span>
                  <span className="text-white font-semibold">
                    {selectedAnime.favorites?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-2">
              {defaultTitle}
            </h1>
            {englishTitle && englishTitle !== defaultTitle && (
              <p className="text-xl text-slate-300 mb-6">{englishTitle}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedAnime.genres?.map((genre) => (
                <span
                  key={genre.name}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Tv className="w-4 h-4" />
                  <span className="text-xs">Type</span>
                </div>
                <p className="text-white font-semibold">{selectedAnime.type}</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Episodes</span>
                </div>
                <p className="text-white font-semibold">
                  {selectedAnime.episodes || "N/A"}
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">Status</span>
                </div>
                <p className="text-white font-semibold">
                  {selectedAnime.status}
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Season</span>
                </div>
                <p className="text-white font-semibold capitalize">
                  {selectedAnime.season && selectedAnime.year
                    ? `${selectedAnime.season} ${selectedAnime.year}`
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
              <p className="text-slate-300 leading-relaxed">
                {selectedAnime.synopsis}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400">Aired:</span>
                    <p className="text-white">{selectedAnime.aired?.string}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Source:</span>
                    <p className="text-white">{selectedAnime.source}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Duration:</span>
                    <p className="text-white">{selectedAnime.duration}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Rating:</span>
                    <p className="text-white">{selectedAnime.rating}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Studios</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAnime.studios &&
                  selectedAnime.studios?.length > 0 ? (
                    selectedAnime.studios.map((studio) => (
                      <span
                        key={studio.name}
                        className="px-3 py-1 bg-slate-700 text-white rounded-lg text-sm"
                      >
                        {studio.name}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-400">No studio information</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
