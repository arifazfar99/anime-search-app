import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useDebounce } from "../hooks/useDebounce";
import {
  fetchAnimeByPopular,
  fetchAnimeBySearch,
} from "../features/anime/animeThunks";
import SearchBar from "../components/common/SearchBar";
import Pagination from "../components/common/Pagination";
import AnimeCard from "@/components/anime/AnimeCard";
import type { Anime } from "@/types/anime";
import SkeletonCard from "@/components/anime/SkeletonCard";

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { animeList, totalPages, loading } = useAppSelector(
    (state) => state.anime
  );

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    window.scrollTo({ top: 80, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      dispatch(fetchAnimeByPopular({ page, limit: 24 }));
    } else {
      dispatch(fetchAnimeBySearch({ query: debouncedQuery, page, limit: 24 }));
    }
  }, [dispatch, debouncedQuery, page]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Anime<span className="text-purple-400">Search</span>
          </h1>
          <p className="text-slate-300 text-lg">
            Discover your next favorite anime
          </p>
        </div>

        <SearchBar value={query} onChange={setQuery} />

        <div className="w-full mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            {query ? `Search Results for "${query}"` : "🔥 Top Anime"}
          </h2>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : animeList.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No anime found</p>
              <p className="text-slate-400 text-lg">
                Try another keyword like <strong>"Naruto"</strong> or{" "}
                <strong>"Attack on Titan"</strong>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {animeList.map((anime: Anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
