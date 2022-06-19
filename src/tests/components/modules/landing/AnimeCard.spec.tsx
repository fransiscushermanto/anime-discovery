import { render, screen } from "@testing-library/react";
import AnimeCard from "../../../../components/modules/landing/AnimeCard";

const mockAnime = {
  __typename: "Media",
  id: 150972,
  bannerImage: null,
  description:
    "Saint Cecilia is beloved by the townspeople—not only is she elegant and composed, she benevolently shares her wisdom with all who seek it. That is, until the last person has left—at which point she becomes totally hopeless! Only Pastor Lawrence, is keeping the Saint put together enough to do her duties...and though she may test him, it's all in a day's work!<br>\n<br>\n(Source: Kodansha USA)",
  status: "NOT_YET_RELEASED",
  chapters: null,
  seasonYear: null,
  popularity: 0,
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
  genres: [],
};

describe("AnimeCard", () => {
  it("should render title", () => {
    render(<AnimeCard anime={mockAnime} />);
    const animeTitleWrapper = screen.getByTestId(`anime-title-${mockAnime.id}`);
    expect(animeTitleWrapper).toHaveTextContent(/Shiro Seijo to Kuro Bokushi/i);
  });

  it("should render banner image", () => {
    render(<AnimeCard anime={mockAnime} />);
    const animeBannerImage = screen.getByAltText(
      /Shiro Seijo to Kuro Bokushi/i,
    );
    expect(animeBannerImage).toBeInTheDocument();
  });

  it("should not render placeholder banner image", () => {
    render(<AnimeCard anime={mockAnime} />);
    const placeholderBannerImage = screen.queryByTestId(
      `placeholder-banner-image-${mockAnime.id}`,
    );
    expect(placeholderBannerImage).not.toBeInTheDocument();
  });
});
