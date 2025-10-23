import React from "react";
import { Link } from "react-router-dom";
import type { Anime } from "../../types/anime";
import { Calendar, Star } from "lucide-react";

const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
  const defaultTitle = anime.titles?.find((t) => t.type === "Default")?.title;
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="group cursor-pointer bg-slate-800/30 backdrop-blur rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <div className="relative overflow-hidden aspect-2/3">
        <img
          src={anime.images.jpg.image_url}
          alt={defaultTitle}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {anime.score && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-lg flex items-center gap-1 font-bold text-sm">
            <Star className="w-3 h-3 fill-current" />
            {anime.score}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold line-clamp-2 mb-2 group-hover:text-purple-400 transition-colors">
          {defaultTitle}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {anime.year || "N/A"}
          </span>
          <span>{anime.type}</span>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
