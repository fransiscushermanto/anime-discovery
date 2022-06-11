import { AnimeSortBy } from "api-hooks/anime";

export const allAnimeListVariables = {
  page: 1,
  perPage: 10,
  sort: [AnimeSortBy.START_DATE_DESC, AnimeSortBy.POPULARITY_DESC],
  isAdult: false,
};
