import { render, screen, fireEvent } from "../../../test-utils";
import { Anime } from "@modules";

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
  },
  ROOT_QUERY: { __typename: "Query", Media: { __ref: "Media:150972" } },
};

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  query: { animeId: 150972, animeTitle: "Shiro-Seijo-to-Kuro-Bokushi" },
  push: jest.fn(),
}));

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

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Anime", () => {
  beforeAll(() => {
    window.localStorage.setItem("collections", JSON.stringify(mockCollections));
  });

  it("should render anime infos and previous binded collections", () => {
    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    const infos = [
      "seasonYear",
      "popularity",
      "chapters",
      "episodes",
      "genres",
      "hashtag",
    ];

    const collectionsElement = getCollectionListItems();

    expect(screen.getByText(mockAnime.title.userPreferred)).toBeInTheDocument();
    expect(screen.getByTestId("banner-image")).toBeInTheDocument();
    expect(collectionsElement).toHaveLength(1);
    collectionsElement.forEach((collectionElement) => {
      expect(collectionElement).toHaveAttribute(
        "href",
        `/collections/${collectionElement.textContent}`,
      );
    });

    infos.forEach((info) => {
      const infoElement = screen.getByTestId(info);
      expect(infoElement).toHaveTextContent(
        (Array.isArray(mockAnime[info])
          ? mockAnime[info].join(", ")
          : mockAnime[info]) ?? "-",
      );
    });
  });

  it("should open modal on click button plus", () => {
    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    openAddAnimeToCollectionModal();

    const modal = screen.getByTestId("add-to-collection-modal");
    expect(modal).toBeInTheDocument();
  });

  it("should render all collection on add to collection modal", () => {
    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    openAddAnimeToCollectionModal();
    const mondayCollection = screen.getByText(/Add to Monday Collection/i);
    expect(mondayCollection).toHaveClass("selected");
    expect(mondayCollection).toHaveStyle({
      cursor: "not-allowed",
      backgroundColor: "green",
    });
    expect(screen.getByText(/Add to Tuesday Collection/i)).not.toHaveClass(
      "selected",
    );
  });

  it("should update previous binded collection when click unbinded collection on add to collection modal", () => {
    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    openAddAnimeToCollectionModal();

    const tuesdayCollection = screen.getByText(/Add to Tuesday Collection/i);
    fireEvent.click(tuesdayCollection);

    expect(screen.getByText(/Tuesday/i)).toBeInTheDocument();
    expect(getCollectionListItems()).toHaveLength(2);
  });

  it("should open add new collection form on click add new", () => {
    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    openAddAnimeToCollectionModal();
    openAddNewCollectionForm();

    const collectionList = screen.queryByTestId("collection-list");
    expect(getAddNewCollectionForm()).toBeInTheDocument();
    expect(collectionList).not.toBeInTheDocument();

    const collectionNotFound = screen.queryByText(/Collection not found/i);
    const chooseFromExisting = screen.getByText(
      /Choose from existing collection/i,
    );
    expect(chooseFromExisting).toBeInTheDocument();
    expect(collectionNotFound).not.toBeInTheDocument();
  });

  it("should add new collection on submit and update collection list", () => {
    const newCollectionName = "Testing";

    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    openAddAnimeToCollectionModal();
    openAddNewCollectionForm();

    onChangeCollectionInput(newCollectionName);
    submitForm();

    expect(
      JSON.parse(window.localStorage.getItem("collections")).some(
        (collection) => collection.name === newCollectionName,
      ),
    ).toBeTruthy();

    expect(screen.getByText(/Testing/i)).toBeInTheDocument();
    expect(getCollectionListItems()).toHaveLength(3);
  });

  it("should show error when collection name is already in list", () => {
    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    openAddAnimeToCollectionModal();
    openAddNewCollectionForm();

    onChangeCollectionInput("Monday");
    submitForm();

    expect(
      screen.getByText(/Collection name already exists/i),
    ).toBeInTheDocument();
  });

  it("should show error when collection name have special character", () => {
    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    openAddAnimeToCollectionModal();
    openAddNewCollectionForm();

    onChangeCollectionInput("Monday-");

    expect(
      screen.getByText(/Name may not have special character/i),
    ).toBeInTheDocument();
  });

  it("should show error when collection name is empty", () => {
    render(<Anime />, {
      mocks: [],
      initialState: mockInitialState,
    });

    openAddAnimeToCollectionModal();
    openAddNewCollectionForm();

    onChangeCollectionInput("");
    submitForm();

    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
  });
});

function getCollectionListItems() {
  return screen.getAllByTestId("collection-list-item");
}

function openAddAnimeToCollectionModal() {
  const addAnimeToCollectionBtn = screen.getByTestId("add-to-collection-btn");
  fireEvent.click(addAnimeToCollectionBtn);
}

function getAddNewCollectionForm() {
  return screen.getByTestId("new-collection-form");
}

function openAddNewCollectionForm() {
  const addNewCollection = screen.getByText(/Add new/i);
  fireEvent.click(addNewCollection);
}

function onChangeCollectionInput(value: string) {
  const collectionInput = screen.getByRole("textbox", {
    name: (_, e) => {
      return e.getAttribute("name") === "collection";
    },
  });
  fireEvent.change(collectionInput, { target: { value } });
}

function submitForm() {
  const submitButton = screen.getByRole("button", {
    name: /Add/i,
  });
  fireEvent.click(submitButton);
}
