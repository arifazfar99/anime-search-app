export interface AnimeImage {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface AnimeImages {
  jpg: AnimeImage;
  webp?: AnimeImage;
}

export interface AnimeTitles {
  type: string;
  title: string;
}

export interface AnimeGenre {
  name: string;
}

export interface AnimeAired {
  string: string;
}

export interface AnimeStudio {
  name: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: AnimeImages;
  titles: AnimeTitles[];
  type?: string;
  episodes?: number;
  status?: string;
  score?: number;
  rank?: number;
  synopsis?: string;
  year?: number;
  scored_by?: number;
  popularity?: number
  members?: number
  favorites?: number
  genres?: AnimeGenre[];
  season?: string;
  aired?: AnimeAired;
  source?: string;
  duration?: string;
  rating?: string;
  studios?: AnimeStudio[];
}

export interface PaginationItems {
  count: number;
  total: number;
  per_page: number;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number
  items: PaginationItems;
}

export interface AnimeResponse {
  pagination: Pagination;
  data: Anime[];
}

export interface AnimeDetailResponse {
  data: Anime;
}
