import { css, cx } from "@emotion/css";
import { AnimeMediaModel } from "@api-hooks/anime";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AnimeCardProps {
  anime: AnimeMediaModel;
}

const styled = {
  root: css`
    cursor: pointer;
    &:hover {
      .banner-image {
        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
      }
      .anime-infos {
        .title {
          background-image: var(--tertiary-color);
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    .banner-image {
      width: 135px;
      height: 193px;
      display: flex;
      margin-bottom: 15px;
      border-radius: 10px;
      transition-property: box-shadow;
      transition-duration: var(--default-transition-duration);
      > * {
        border-radius: 10px;
      }
      > .placeholder-banner-image {
        height: 100%;
        width: 100%;
        background-color: gray;
      }
    }

    .anime-infos {
      .title {
        transition-property: var(--default-transition-property-background);
        transition-duration: var(--default-transition-duration);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  `,
};

function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link
      href={`/anime/${anime.id}/${anime.title.userPreferred
        .replace(/[ :]/g, "-")
        .replace(/--/g, "-")
        .replace(/\//g, "")}`}
      passHref
    >
      <li
        className={cx(styled.root, "anime-list-item")}
        role="anime-list-item"
        data-testid={`anime-list-item-${anime.id}`}
      >
        <div className="banner-image">
          {anime.coverImage ? (
            <Image
              data-testid={`anime-banner-image-${anime.id}`}
              src={anime.coverImage.large}
              width={154}
              height={184}
              alt={anime.title.userPreferred}
            />
          ) : (
            <div
              className="placeholder-banner-image"
              data-testid={`placeholder-banner-image-${anime.id}`}
            ></div>
          )}
        </div>
        <div className="anime-infos">
          <div className="title" data-testid={`anime-title-${anime.id}`}>
            <span>{anime.title.userPreferred}</span>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default AnimeCard;
