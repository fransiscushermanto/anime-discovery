import { ANIME_LIST_QUERY } from "@graphql/anime";
import { render, screen, fireEvent, act, waitFor } from "../test-utils";
import React from "react";
import Home from "../../pages/index";
import { allAnimeListVariables } from "@modules";

const mockAnimeListData = [
  {
    request: {
      query: ANIME_LIST_QUERY,
      variables: allAnimeListVariables,
    },
    result: {
      data: {
        Page: {
          __typename: "Page",
          pageInfo: {
            __typename: "PageInfo",
            total: 11,
            currentPage: 1,
            lastPage: 2,
            perPage: 10,
            hasNextPage: false,
          },
          media: [
            {
              __typename: "Media",
              id: 150999,
              bannerImage: null,
              description:
                "Saint Cecilia is beloved by the townspeople—not only is she elegant and composed, she benevolently shares her wisdom with all who seek it. That is, until the last person has left—at which point she becomes totally hopeless! Only Pastor Lawrence, is keeping the Saint put together enough to do her duties...and though she may test him, it's all in a day's work!<br>\n<br>\n(Source: Kodansha USA)",
              status: "NOT_YET_RELEASED",
              chapters: null,
              seasonYear: null,
              popularity: 673,
              episodes: null,
              hashtag: "#白聖女と黒牧師",
              coverImage: {
                __typename: "MediaCoverImage",
                extraLarge:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150972-l6AT4HbDoh7J.jpg",
                large:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150972-l6AT4HbDoh7J.jpg",
                medium:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150972-l6AT4HbDoh7J.jpg",
                color: null,
              },
              genres: [],
              title: {
                __typename: "MediaTitle",
                userPreferred: "Shiro Seijo to Kuro Bokushi",
              },
              trailer: null,
            },
            {
              __typename: "Media",
              id: 150957,
              bannerImage: null,
              description:
                "Koganei Koito is a teenager who works as an attendant to the Takamimi Shrine. Rumors have it that a deity dwells within the shrine, but the actual resident is an immortal elf who found herself stuck on Earth some four hundred years ago. What’s more, the elf is a total shut-in who won’t go outside…and has developed a taste for video games! Now the attendants at the shrine have to cater to the elf’s love of the most modern gizmos–from handheld games to virtual reality headsets–in this charming fantasy comedy!\n<br><br>\n(Source: Seven Seas Entertainment) ",
              status: "NOT_YET_RELEASED",
              chapters: null,
              seasonYear: null,
              popularity: 609,
              episodes: null,
              hashtag: "#江戸前エルフ",
              genres: [],
              coverImage: {
                __typename: "MediaCoverImage",
                extraLarge:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150957-OHquNveSUW47.png",
                large:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150957-OHquNveSUW47.png",
                medium:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150957-OHquNveSUW47.png",
                color: "#e4431a",
              },
              title: { __typename: "MediaTitle", userPreferred: "Edomae Elf" },
              trailer: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: ANIME_LIST_QUERY,
      variables: {
        ...allAnimeListVariables,
        page: 2,
      },
    },
    result: {
      data: {
        Page: {
          __typename: "Page",
          pageInfo: {
            __typename: "PageInfo",
            total: 11,
            currentPage: 2,
            lastPage: 2,
            perPage: 10,
            hasNextPage: false,
          },
          media: [
            {
              id: 150972,
              bannerImage: null,
              description: "Dari sabang sampai merauke",
              status: "NOT_YET_RELEASED",
              chapters: null,
              episodes: null,
              genres: [],
              seasonYear: null,
              popularity: 673,
              hashtag: "#IndomieSeleraku",
              coverImage: {
                extraLarge:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150972-l6AT4HbDoh7J.jpg",
                large:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150972-l6AT4HbDoh7J.jpg",
                medium:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150972-l6AT4HbDoh7J.jpg",
                color: null,
              },
              title: {
                userPreferred: "The journey of Indomie",
              },
              trailer: null,
            },
          ],
        },
      },
    },
  },
];

const mockInitialState = {
  "Media:150972": {
    __typename: "Media",
    id: 150972,
    bannerImage: null,
    'description({"asHtml":false})':
      "Saint Cecilia is beloved by the townspeople—not only is she elegant and composed, she benevolently shares her wisdom with all who seek it. That is, until the last person has left—at which point she becomes totally hopeless! Only Pastor Lawrence, is keeping the Saint put together enough to do her duties...and though she may test him, it's all in a day's work!<br>\n<br>\n(Source: Kodansha USA)",
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 673,
    episodes: null,
    hashtag: "#白聖女と黒牧師",
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150972-l6AT4HbDoh7J.jpg",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150972-l6AT4HbDoh7J.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150972-l6AT4HbDoh7J.jpg",
      color: null,
    },
    title: {
      __typename: "MediaTitle",
      userPreferred: "Shiro Seijo to Kuro Bokushi",
    },
    trailer: null,
  },
  "MediaTrailer:VOpVzMsb6l4": {
    __typename: "MediaTrailer",
    id: "VOpVzMsb6l4",
    site: "youtube",
    thumbnail: "https://i.ytimg.com/vi/VOpVzMsb6l4/hqdefault.jpg",
  },
  "Media:150957": {
    __typename: "Media",
    id: 150957,
    bannerImage: null,
    'description({"asHtml":false})':
      "Koganei Koito is a teenager who works as an attendant to the Takamimi Shrine. Rumors have it that a deity dwells within the shrine, but the actual resident is an immortal elf who found herself stuck on Earth some four hundred years ago. What’s more, the elf is a total shut-in who won’t go outside…and has developed a taste for video games! Now the attendants at the shrine have to cater to the elf’s love of the most modern gizmos–from handheld games to virtual reality headsets–in this charming fantasy comedy!\n<br><br>\n(Source: Seven Seas Entertainment) ",
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 609,
    episodes: null,
    hashtag: "#江戸前エルフ",
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150957-OHquNveSUW47.png",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150957-OHquNveSUW47.png",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150957-OHquNveSUW47.png",
      color: "#e4431a",
    },
    title: { __typename: "MediaTitle", userPreferred: "Edomae Elf" },
    trailer: { __ref: "MediaTrailer:VOpVzMsb6l4" },
  },
  "Media:150930": {
    __typename: "Media",
    id: 150930,
    bannerImage: null,
    'description({"asHtml":false})':
      "The slightly strange high school student Murai confessed love to his teacher and otome-game fanatic Tanaka-sensei. She refused by telling him she's not interested in (real-life) long, black-haired boys. The next day, Murai came back with short blonde hair, which made him look just like Tanaka-sensei's favorite game character! A non-stop romantic comedy between a stubborn high school boy and his favorite teacher!",
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 155,
    episodes: null,
    hashtag: "#村井の恋",
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150930-jTXnvUvqvDEm.jpg",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150930-jTXnvUvqvDEm.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150930-jTXnvUvqvDEm.jpg",
      color: null,
    },
    title: {
      __typename: "MediaTitle",
      userPreferred: "Murai no Koi",
    },
    trailer: null,
  },
  "Media:150672": {
    __typename: "Media",
    id: 150672,
    bannerImage: null,
    'description({"asHtml":false})':
      '<i>"In the world of showbiz, lies are weapons." </i>\n<br><br>\nGoro works as an OB-GYN in the countryside, a life far removed from the entertainment industry. Meanwhile, his favorite idol, Ai Hoshino, has begun her climb to stardom. The two meet in the "worst possible way," setting the gears of fate in motion!<br>\n<br>\n(Source: MANGA Plus)',
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 9765,
    episodes: null,
    hashtag: "#推しの子",
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150672-0cjYwmUQsgwK.png",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150672-0cjYwmUQsgwK.png",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150672-0cjYwmUQsgwK.png",
      color: "#5050e4",
    },
    title: {
      __typename: "MediaTitle",
      userPreferred: "[Oshi no Ko]",
    },
    trailer: null,
  },
  "Media:150654": {
    __typename: "Media",
    id: 150654,
    bannerImage: null,
    'description({"asHtml":false})':
      '“Moonrise” takes place in the near future and will be set in both the Moon and on Earth. WIT STUDIO will join forces with Mr. Ubukata, who is known for the popular series of “Mardock Scramble” (Winner of the Nihon SF Taisho Award) and the historical novel “The Universe Revealed” (Winner of the Booksellers Award).<br><br>\n"Moonrise" will portray the lives of two men, Jack and Al, as they confront various hardships in the vast world of outer space. All action and scenery in the unexplored parts of the Moon will be illustrated using an innovative type of animation unlike any seen before.<br><br>\n(Source: Netflix, Anime News Network)',
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 711,
    episodes: null,
    hashtag: null,
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150654-DjqOv8Md8yTI.jpg",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150654-DjqOv8Md8yTI.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150654-DjqOv8Md8yTI.jpg",
      color: "#e45d1a",
    },
    title: { __typename: "MediaTitle", userPreferred: "Moonrise" },
    trailer: null,
  },
  "MediaTrailer:TpWJ7eeZHbI": {
    __typename: "MediaTrailer",
    id: "TpWJ7eeZHbI",
    site: "youtube",
    thumbnail: "https://i.ytimg.com/vi/TpWJ7eeZHbI/hqdefault.jpg",
  },
  "Media:150295": {
    __typename: "Media",
    id: 150295,
    bannerImage: null,
    'description({"asHtml":false})': null,
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 19,
    episodes: 1,
    hashtag: null,
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150295-KGbvjpuGMTca.jpg",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150295-KGbvjpuGMTca.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150295-KGbvjpuGMTca.jpg",
      color: "#93351a",
    },
    title: {
      __typename: "MediaTitle",
      userPreferred: "Gesar Wang: Molian",
    },
    trailer: { __ref: "MediaTrailer:TpWJ7eeZHbI" },
  },
  "Media:150225": {
    __typename: "Media",
    id: 150225,
    bannerImage: null,
    'description({"asHtml":false})':
      "I, an upcoming superstar, became a cat due to an accident; what's unfortunate is that I also fell into my enemy's hands?! Oblivious to the situation, he touched me, scolded me, hugged me, kissed me.. I tried to put up with it, b-but he still longs for my body!<br><br>\nDamn it, someone save me!!!<br><br>\n(Source: Bilibili, translated)",
    status: "RELEASING",
    chapters: null,
    seasonYear: null,
    popularity: 7,
    episodes: null,
    hashtag: null,
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx150225-64iVCo4Jrhmq.jpg",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx150225-64iVCo4Jrhmq.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/manga/cover/small/bx150225-64iVCo4Jrhmq.jpg",
      color: "#e4e40d",
    },
    title: {
      __typename: "MediaTitle",
      userPreferred: "Jintian Ye Yao Nuli Dang Zhi Mao",
    },
    trailer: null,
  },
  "Media:150152": {
    __typename: "Media",
    id: 150152,
    bannerImage: null,
    'description({"asHtml":false})': null,
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 45,
    episodes: null,
    hashtag: null,
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150152-iTm93ihOdGH9.png",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150152-iTm93ihOdGH9.png",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150152-iTm93ihOdGH9.png",
      color: "#f1a150",
    },
    title: {
      __typename: "MediaTitle",
      userPreferred: "Strike! Nifeng Toushou",
    },
    trailer: null,
  },
  "MediaTrailer:OoJ83qldAWc": {
    __typename: "MediaTrailer",
    id: "OoJ83qldAWc",
    site: "youtube",
    thumbnail: "https://i.ytimg.com/vi/OoJ83qldAWc/hqdefault.jpg",
  },
  "Media:150151": {
    __typename: "Media",
    id: 150151,
    bannerImage: null,
    'description({"asHtml":false})': null,
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 35,
    episodes: null,
    hashtag: null,
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150151-UeaKNWaa4I8F.jpg",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150151-UeaKNWaa4I8F.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150151-UeaKNWaa4I8F.jpg",
      color: "#e46b50",
    },
    title: {
      __typename: "MediaTitle",
      userPreferred: "Wu Di De Zuqiu",
    },
    trailer: { __ref: "MediaTrailer:OoJ83qldAWc" },
  },
  "MediaTrailer:gf6OH0QYc7k": {
    __typename: "MediaTrailer",
    id: "gf6OH0QYc7k",
    site: "youtube",
    thumbnail: "https://i.ytimg.com/vi/gf6OH0QYc7k/hqdefault.jpg",
  },
  "Media:150117": {
    __typename: "Media",
    id: 150117,
    bannerImage: null,
    'description({"asHtml":false})':
      "The year is 20XX... A time when every household owns cute maid robots known as OrderMaids. Average grade-schooler Bondo dreams of having his very own robot. But what he got was... Unable to compute!!! Life is gonna get a whole lot weirder when Roboco, the most powerful clumsy maid ever created, shows up at his door!\n<br><br>\n(Source: MANGA Plus)",
    status: "NOT_YET_RELEASED",
    chapters: null,
    seasonYear: null,
    popularity: 325,
    episodes: null,
    hashtag: "#僕とロボコ",
    coverImage: {
      __typename: "MediaCoverImage",
      extraLarge:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150117-FbYwxEmqhGXf.jpg",
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx150117-FbYwxEmqhGXf.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx150117-FbYwxEmqhGXf.jpg",
      color: "#d6d61a",
    },
    title: {
      __typename: "MediaTitle",
      userPreferred: "Boku to Roboco",
    },
    trailer: { __ref: "MediaTrailer:gf6OH0QYc7k" },
  },
  ROOT_QUERY: {
    __typename: "Query",
    Page: {
      __typename: "Page",
      pageInfo: {
        __typename: "PageInfo",
        total: 11,
        currentPage: 1,
        lastPage: 2,
        hasNextPage: true,
        perPage: 10,
      },
      'media({"isAdult":false,"sort":["START_DATE_DESC","POPULARITY_DESC"]})': [
        { __ref: "Media:150972" },
        { __ref: "Media:150957" },
        { __ref: "Media:150930" },
        { __ref: "Media:150672" },
        { __ref: "Media:150654" },
        { __ref: "Media:150295" },
        { __ref: "Media:150225" },
        { __ref: "Media:150152" },
        { __ref: "Media:150151" },
        { __ref: "Media:150117" },
      ],
    },
  },
};

jest.mock(
  "next/link",
  () =>
    ({ children }) =>
      children,
);

const mockQuery = { page: 1 };

const mockPush = jest.fn((args) => {
  mockQuery.page = args.query.page;
});
const mockUseRouter = jest.spyOn(require("next/router"), "useRouter");
mockUseRouter.mockImplementation(() => ({
  query: mockQuery,
  push: mockPush,
}));

describe("Home", () => {
  it("should render initial 10 anime", () => {
    render(<Home />, {
      mocks: [mockAnimeListData[0], mockAnimeListData[1]],
      initialState: mockInitialState,
    });

    const animeCard = screen.getAllByRole("anime-list-item");
    const activePagination = screen.getByTestId(`page-${1}`);

    expect(animeCard.length).toBe(10);
    expect(activePagination).toHaveClass("active");
  });

  it("should update currenPage on click pagination item button", async () => {
    window.scrollTo = jest.fn();
    let initialState = mockInitialState;

    act(() => {
      render(<Home />, {
        mocks: [mockAnimeListData[0], mockAnimeListData[1]],
        initialState: initialState,
      });
    });

    fireEvent.click(screen.getByTestId(`page-${2}`));

    await waitFor(() => {
      expect(screen.getByTestId(`page-${2}`)).toHaveClass("active");
    });
  });
});
