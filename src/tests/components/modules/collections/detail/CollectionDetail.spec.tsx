import { render, screen, fireEvent, renderHook } from "../../../../test-utils";
import { CollectionDetail } from "@modules";
import { useRouter } from "next/router";

const mockAnime = {
  id: 150972,
  bannerImage: null,
  description:
    "Saint Cecilia is beloved by the townspeople—not only is she elegant and composed, she benevolently shares her wisdom with all who seek it. That is, until the last person has left—at which point she becomes totally hopeless! Only Pastor Lawrence, is keeping the Saint put together enough to do her duties...and though she may test him, it's all in a day's work!<br>\n<br>\n(Source: Kodansha USA)",
  status: "NOT_YET_RELEASED",
  chapters: null,
  seasonYear: null,
  popularity: 739,
  episodes: null,
  hashtag: "#白聖女と黒牧師",
  genres: ["Comedy", "Fantasy", "Romance", "Slice of Life"],
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
    romaji: "Shiro Seijo to Kuro Bokushi",
    native: "白聖女と黒牧師",
    english: null,
  },
  trailer: null,
};

const mockCollections = [
  {
    name: "Monday",
    animes: [mockAnime],
  },
  {
    name: "Tuesday",
    animes: [],
  },
];

const localStorageMock = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

const mockUseRouter = jest.spyOn(require("next/router"), "useRouter");
mockUseRouter.mockImplementation(() => ({
  query: { collectionName: "Monday" },
}));

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("CollectionDetail", () => {
  beforeAll(() => {
    window.localStorage.setItem("collections", JSON.stringify(mockCollections));
  });

  it("should render collection name as title", () => {
    render(<CollectionDetail />, { mocks: [], initialState: {} });
    const { result } = renderHook(() => useRouter());
    const { collectionName } = result.current.query;

    expect(screen.getByText(collectionName as string)).toBeInTheDocument();
  });

  it("should render 404 when collectionName query is not found", () => {
    mockUseRouter.mockReturnValue({
      query: { collectionName: "asd" },
    });
    render(<CollectionDetail />, { mocks: [], initialState: {} });

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  afterEach(() => {
    mockUseRouter.mockReturnValue({
      query: { collectionName: "Monday" },
    });
  });

  it("should render all animes that is in the collection", () => {
    render(<CollectionDetail />, { mocks: [], initialState: {} });
    const { result } = renderHook(() => useRouter());
    const { collectionName } = result.current.query;

    const collectionAnimes = mockCollections.find(
      (collection) => collection.name === collectionName,
    ).animes;

    expect(getCollectionListItems()).toHaveLength(collectionAnimes.length);
  });

  it("should show name, cover, remove btn on each anime card", () => {
    render(<CollectionDetail />, { mocks: [], initialState: {} });
    const { result } = renderHook(() => useRouter());
    const { collectionName } = result.current.query;

    const collectionAnimes = mockCollections.find(
      (collection) => collection.name === collectionName,
    ).animes;

    collectionAnimes.forEach((collectionAnime) => {
      expect(
        screen.getByTestId(`anime-list-item-${collectionAnime.id}`),
      ).toHaveAttribute(
        "href",
        `/anime/${collectionAnime.id}/${collectionAnime.title.userPreferred
          .replace(/[ :]/g, "-")
          .replace(/--/g, "-")
          .replace(/\//g, "")}`,
      );
      expect(
        screen.getByTestId(`anime-banner-image-${collectionAnime.id}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`anime-title-${collectionAnime.id}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`remove-btn-${collectionAnime.id}`),
      ).toBeInTheDocument();
    });
  });

  it("should show confirmation window on click remove", () => {
    render(<CollectionDetail />, { mocks: [], initialState: {} });
    const { result } = renderHook(() => useRouter());
    const { collectionName } = result.current.query;

    window.confirm = jest.fn();

    const collectionAnime = mockCollections.find(
      (collection) => collection.name === collectionName,
    ).animes[0];

    fireEvent.click(screen.getByTestId(`remove-btn-${collectionAnime.id}`));

    expect(window.confirm).toHaveBeenCalled();
  });

  it("should remove anime from collection on click remove and confirm delete", () => {
    render(<CollectionDetail />, { mocks: [], initialState: {} });
    const { result } = renderHook(() => useRouter());
    const { collectionName } = result.current.query;

    window.confirm = jest.fn(() => true);

    const collectionAnime = mockCollections.find(
      (collection) => collection.name === collectionName,
    ).animes[0];

    fireEvent.click(screen.getByTestId(`remove-btn-${collectionAnime.id}`));

    const collections = JSON.parse(window.localStorage.getItem("collections"));

    expect(
      collections
        .find((collection) => collection.name === collectionName)
        .animes.some((anime) => anime.id === collectionAnime.id),
    ).not.toBeTruthy();
    expect(
      screen.queryByTestId(`anime-list-item-${collectionAnime.id}`),
    ).not.toBeInTheDocument();
  });
});

function getCollectionListItems() {
  return screen.getAllByRole("anime-list-item");
}
