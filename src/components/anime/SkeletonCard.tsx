import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-slate-800/30 backdrop-blur rounded-lg overflow-hidden animate-pulse">
      <div className="relative overflow-hidden aspect-2/3 bg-slate-700">
        <div className="absolute top-2 right-2 w-12 h-5 bg-slate-600 rounded-lg" />
      </div>

      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-600 rounded w-3/4" />
        <div className="h-4 bg-slate-600 rounded w-1/2" />
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <div className="w-16 h-3 bg-slate-600 rounded" />
          <div className="w-12 h-3 bg-slate-600 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
