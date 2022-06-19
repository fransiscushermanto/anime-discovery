import { CollectionList } from "@modules";
import { render, fireEvent, screen } from "../../../test-utils";

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

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("CollectionList", () => {
  beforeAll(() => {
    window.localStorage.setItem("collections", JSON.stringify(mockCollections));
  });

  it("should render collection list with cover image and href", () => {
    render(<CollectionList />, { mocks: [], initialState: {} });

    mockCollections.forEach((collection) => {
      expect(screen.getByText(collection.name)).toBeInTheDocument();
      expect(
        Array.from(getCollectionListItems()).some(
          (item) =>
            item.getAttribute("href") === `/collections/${collection.name}`,
        ),
      ).toBeTruthy();
      if (collection.animes.length > 0) {
        expect(
          screen.getByTestId(`collection-cover-${collection.name}`),
        ).toBeInTheDocument();
        expect(
          screen.queryByTestId(
            `placeholder-collection-cover-${collection.name}`,
          ),
        ).not.toBeInTheDocument();
      } else {
        expect(
          screen.queryByTestId(`collection-cover-${collection.name}`),
        ).not.toBeInTheDocument();
        expect(
          screen.getByTestId(`placeholder-collection-cover-${collection.name}`),
        ).toBeInTheDocument();
      }
    });

    expect(getCollectionListItems()).toHaveLength(mockCollections.length);
  });

  it("should render temporary collection list item on click add card", () => {
    render(<CollectionList />, { mocks: [], initialState: {} });

    const addButton = screen.getByRole("add-collection");
    fireEvent.click(addButton);

    expect(
      screen.getByTestId("temporary-collection-list-item"),
    ).toBeInTheDocument();
    expect(getCollectionInput()).toBeInTheDocument();
  });

  it("should add collection and update list on submit", () => {
    const newCollection = "Testing";
    render(<CollectionList />, { mocks: [], initialState: {} });

    const addButton = screen.getByRole("add-collection");
    fireEvent.click(addButton);

    const input = getCollectionInput();
    fireEvent.change(input, { target: { value: newCollection } });

    const submitBtn = screen.getByRole("submit-btn");
    fireEvent.click(submitBtn);

    const collections = JSON.parse(window.localStorage.getItem("collections"));

    expect(collections).toHaveLength(3);
    expect(
      collections.some((collection) => collection.name === newCollection),
    ).toBeTruthy();
  });

  it("should show error when collection name is empty", () => {
    const newCollection = "";
    render(<CollectionList />, { mocks: [], initialState: {} });

    const addButton = screen.getByRole("add-collection");
    fireEvent.click(addButton);

    const input = getCollectionInput();
    fireEvent.change(input, { target: { value: newCollection } });

    const submitBtn = screen.getByRole("submit-btn");
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
  });

  it("should show error when adding collection name that already exist", () => {
    const newCollection = "Testing";
    render(<CollectionList />, { mocks: [], initialState: {} });

    const addButton = screen.getByRole("add-collection");
    fireEvent.click(addButton);

    const input = getCollectionInput();
    fireEvent.change(input, { target: { value: newCollection } });

    const submitBtn = screen.getByRole("submit-btn");
    fireEvent.click(submitBtn);

    expect(
      screen.getByText(/Collection name already exist/i),
    ).toBeInTheDocument();
  });

  it("should show error when inputing collection name that has special character", () => {
    const newCollection = "Testing-";
    render(<CollectionList />, { mocks: [], initialState: {} });

    const addButton = screen.getByRole("add-collection");
    fireEvent.click(addButton);

    const input = getCollectionInput();
    fireEvent.change(input, { target: { value: newCollection } });

    expect(
      screen.getByText(/Name may not have special character/i),
    ).toBeInTheDocument();
  });

  it("should remove temporary collection list item on click cancel", () => {
    render(<CollectionList />, { mocks: [], initialState: {} });

    const addButton = screen.getByRole("add-collection");
    fireEvent.click(addButton);

    const cancelBtn = screen.getByRole("cancel-btn");
    fireEvent.click(cancelBtn);

    expect(
      screen.queryByTestId("temporary-collection-list-item"),
    ).not.toBeInTheDocument();
  });

  it("should show confirmation window on click delete", () => {
    render(<CollectionList />, { mocks: [], initialState: {} });

    window.confirm = jest.fn();

    const deleteButton = screen.getByRole("delete-btn", {
      name: (_, e) => e.getAttribute("data-collection-name") === "Testing",
    });

    fireEvent.click(deleteButton);

    expect(window.confirm).toBeCalled();
  });

  it("should remove collection on click delete and confirm delete in a confirmation window", () => {
    render(<CollectionList />, { mocks: [], initialState: {} });

    window.confirm = jest.fn(() => true);

    const deleteButton = screen.getByRole("delete-btn", {
      name: (_, e) => e.getAttribute("data-collection-name") === "Testing",
    });

    fireEvent.click(deleteButton);

    expect(window.confirm).toBeCalled();

    const collections = JSON.parse(window.localStorage.getItem("collections"));

    expect(collections).toHaveLength(2);
    expect(
      collections.some((collection) => collection.name === "Testing"),
    ).not.toBeTruthy();
  });
});

function getCollectionListItems() {
  return screen.getAllByTestId("collection-list-item");
}

function getCollectionInput() {
  return screen.getByRole("textbox", {
    name: (_, e) => e.getAttribute("name") === "collection",
  });
}
