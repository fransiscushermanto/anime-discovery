import { QueryHookOptions, useQuery } from "@apollo/client";
import { ANIME_LIST_QUERY, ANIME_QUERY } from "@graphql/anime";
import { AnimeMediaModel } from "./anime.model";

export function useGetAnimeList(options: QueryHookOptions = {}) {
  return useQuery<{
    Page: {
      pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
      };
      media: AnimeMediaModel[];
    };
  }>(ANIME_LIST_QUERY, options);
}

export function useGetAnime(options: QueryHookOptions = {}) {
  return useQuery<{
    Media: AnimeMediaModel;
  }>(ANIME_QUERY, options);
}
