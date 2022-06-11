export interface AnimeMediaModel {
  id: number;
  bannerImage: string;
  description: string;
  status: string;
  seasonYear: number;
  popularity: number;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  title: {
    userPreferred: string;
  };
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
}

export interface AnimeListResponse {
  Page: {
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
    };
    media: AnimeMediaModel[];
  };
}

export enum AnimeStatus {
  FINISHED = "FINISHED",
  RELEASING = "RELEASING",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
  CANCELLED = "CANCELLED",
  HIATUS = "HIATUS",
}

export enum AnimeSortBy {
  ID = "ID",
  ID_DESC = "ID_DESC",
  TITLE_ROMAJI = "TITLE_ROMAJI",
  TITLE_ROMAJI_DESC = "TITLE_ROMAJI_DESC",
  TITLE_ENGLISH = "TITLE_ENGLISH",
  TITLE_ENGLISH_DESC = "TITLE_ENGLISH_DESC",
  TITLE_NATIVE = "TITLE_NATIVE",
  TITLE_NATIVE_DESC = "TITLE_NATIVE_DESC",
  TYPE = "TYPE",
  TYPE_DESC = "TYPE_DESC",
  FORMAT = "FORMAT",
  FORMAT_DESC = "FORMAT_DESC",
  START_DATE = "START_DATE",
  START_DATE_DESC = "START_DATE_DESC",
  END_DATE = "END_DATE",
  END_DATE_DESC = "END_DATE_DESC",
  SCORE = "SCORE",
  SCORE_DESC = "SCORE_DESC",
  POPULARITY = "POPULARITY",
  POPULARITY_DESC = "POPULARITY_DESC",
  TRENDING = "TRENDING",
  TRENDING_DESC = "TRENDING_DESC",
  EPISODES = "EPISODES",
  EPISODES_DESC = "EPISODES_DESC",
  DURATION = "DURATION",
  DURATION_DESC = "DURATION_DESC",
  STATUS = "STATUS",
  STATUS_DESC = "STATUS_DESC",
  CHAPTERS = "CHAPTERS",
  CHAPTERS_DESC = "CHAPTERS_DESC",
  VOLUMES = "VOLUMES",
  VOLUMES_DESC = "VOLUMES_DESC",
  UPDATED_AT = "UPDATED_AT",
  UPDATED_AT_DESC = "UPDATED_AT_DESC",
  SEARCH_MATCH = "SEARCH_MATCH",
  FAVOURITES = "FAVOURITES",
  FAVOURITES_DESC = "FAVOURITES_DESC",
}
