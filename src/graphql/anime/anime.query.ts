import { gql } from "@apollo/client";

export const ANIME_LIST_QUERY = gql`
  query (
    $id: Int
    $page: Int
    $perPage: Int
    $search: String
    $sort: [MediaSort]
    $isAdult: Boolean
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media(id: $id, search: $search, sort: $sort, isAdult: $isAdult) {
        id
        bannerImage
        description(asHtml: false)
        status
        chapters
        seasonYear
        popularity
        episodes
        hashtag
        coverImage {
          extraLarge
          large
          medium
          color
        }
        title {
          userPreferred
        }
        trailer {
          id
          site
          thumbnail
        }
      }
    }
  }
`;

export const ANIME_QUERY = gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      bannerImage
      description(asHtml: false)
      status
      chapters
      seasonYear
      popularity
      episodes
      hashtag
      genres
      coverImage {
        extraLarge
        large
        medium
        color
      }
      title {
        userPreferred
      }
      trailer {
        id
        site
        thumbnail
      }
    }
  }
`;
