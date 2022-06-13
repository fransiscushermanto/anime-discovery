import { shortenLongText } from "@common/helpers/strings";
import { css, cx } from "@emotion/css";
import { useAnimeCollections } from "@hooks";
import { Angle } from "@shapes";
import { useGetAnime } from "api-hooks/anime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AddToCollectionModal from "./AddToCollectionModal";

const styled = {
  root: css`
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    @media (max-width: 375px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    .back-btn {
      cursor: pointer;
      width: fit-content;
      background-color: transparent;
      border: none;
      margin-bottom: 10px;
      > svg {
        width: 20px;
        height: 20px;
      }
    }
    .top-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .banner-image {
        position: relative;
        display: flex;
        border-radius: 1rem;
        * {
          border-radius: 1rem;
        }

        .add-to-collection-btn {
          cursor: pointer;
          position: absolute;
          bottom: 3%;
          right: 5%;

          width: 40px;
          height: 40px;
          background-color: transparent;
          color: var(--secondary-color);
          border: none;
          border-radius: 14px;
          font-size: 1rem;
          background-image: var(--tertiary-color);
        }
      }

      .title {
        font-weight: 500;
        font-size: 24px;
        margin: 30px 0 20px;
      }

      .description-wrapper {
        display: block;
        font-size: 13px;

        .description {
          margin: 0;
        }
        .action-description {
          cursor: pointer;
        }
        &.see-more .action-description {
          margin-top: 5px;
          display: block;
        }
      }
    }

    .bottom-wrapper {
      margin-top: 20px;

      .collection-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .collection-list-item {
          &:not(:last-child) {
            margin-right: 10px;
          }
          cursor: pointer;
          text-decoration: underline;
        }
      }

      .infos {
        > .info {
          &:not(:last-child) {
            margin-bottom: 20px;
          }

          display: flex;
          flex-direction: column;
          .title {
            margin-bottom: 10px;
            font-size: 1rem;
          }
          .value {
            font-weight: bold;
            font-size: 13px;
          }
        }
      }
    }
  `,
};

const MAX_DESCRIPTION_LENGTH = 200;

function Anime() {
  const router = useRouter();
  const { animeId } = router.query;
  const { data } = useGetAnime({ variables: { id: animeId } });
  const { addAnimeToCollection, getAnimeCollections } = useAnimeCollections();
  const [showMore, setShowMore] = useState(false);

  const [showAddToCollectionModal, setShowAddToCollectionModal] =
    useState(false);

  function onAddAnimeToCollection(collectionName: string) {
    addAnimeToCollection(collectionName, data.Media);
    closeModal("add");
  }

  function openModal(type: "add") {
    switch (type) {
      case "add":
        setShowAddToCollectionModal(true);
        break;

      default:
        break;
    }
  }

  function closeModal(type: "add") {
    switch (type) {
      case "add":
        setShowAddToCollectionModal(false);
        break;

      default:
        break;
    }
  }

  return (
    <div className={styled.root}>
      <button onClick={() => router.back()} className="back-btn">
        <Angle />
      </button>
      <div className="top-wrapper">
        <div className="banner-image">
          <Image
            width={400}
            height={600}
            src={data.Media.coverImage.extraLarge}
            alt={data.Media.title.userPreferred}
          />
          <button
            onClick={() => openModal("add")}
            className="add-to-collection-btn"
          >
            +
          </button>
        </div>
        <h3 className="title">{data.Media.title.userPreferred}</h3>
        {data.Media.description ? (
          <div
            className={cx("description-wrapper", { ["see-more"]: showMore })}
          >
            <span
              className="description"
              dangerouslySetInnerHTML={{
                __html: shortenLongText(
                  data.Media.description,
                  showMore
                    ? data.Media.description.length ?? 0
                    : MAX_DESCRIPTION_LENGTH,
                ),
              }}
            />
            {data.Media.description.length > MAX_DESCRIPTION_LENGTH && (
              <span
                className="action-description"
                onClick={() => setShowMore((prev) => !prev)}
              >
                See {showMore ? "less" : "more"}
              </span>
            )}
          </div>
        ) : null}
      </div>
      <div className="bottom-wrapper">
        <h3>Collections:</h3>
        {getAnimeCollections(data.Media.id).length > 0 ? (
          <ul className="collection-list">
            {getAnimeCollections(data.Media.id).map((collection) => (
              <Link
                href={`/collections/${collection.name}`}
                key={collection.name}
              >
                <li className="collection-list-item">{collection.name}</li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No collections</p>
        )}

        <h3>Anime Info:</h3>
        <div className="infos">
          <div className="info seasonYear">
            <span className="title">Season Year</span>
            <span className="value">{data.Media.seasonYear ?? "-"}</span>
          </div>
          <div className="info popularity">
            <span className="title">Popularity</span>
            <span className="value">{data.Media.popularity ?? "-"}</span>
          </div>
          <div className="info chapters">
            <span className="title">Chapters</span>
            <span className="value">{data.Media.chapters ?? "-"}</span>
          </div>
          <div className="info episodes">
            <span className="title">Episodes</span>
            <span className="value">{data.Media.episodes ?? "-"}</span>
          </div>
          <div className="info hastag">
            <span className="title">Hastag</span>
            <span className="value">{data.Media.hashtag ?? "-"}</span>
          </div>
          <div className="info genres">
            <span className="title">Genres</span>
            <span className="value">{data.Media.genres.join(", ") ?? "-"}</span>
          </div>
        </div>
      </div>
      {showAddToCollectionModal ? (
        <AddToCollectionModal
          currentAnime={data.Media}
          onAddAnimeToCollection={onAddAnimeToCollection}
          onClose={() => closeModal("add")}
        />
      ) : null}
    </div>
  );
}

export default Anime;
