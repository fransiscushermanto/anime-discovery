import { css } from "@emotion/css";
import { useAnimeCollections } from "@hooks";
import { Error404 } from "@layouts";
import { useRouter } from "next/router";
import AnimeCard from "../../landing/AnimeCard";
import React from "react";
import { Angle } from "@shapes";
import { AnimeMediaModel } from "api-hooks/anime";

const styled = {
  root: css`
    padding: 0px 28px 20px;
    @media (max-width: 375px) {
      padding-left: 10px;
      padding-right: 10px;
    }

    header {
      display: flex;
      align-items: center;
      .back-btn {
        cursor: pointer;
        margin-right: 20px;
        border: none;
        background-color: transparent;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
    .anime-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: grid;
      justify-content: center;
      column-gap: 22px;
      row-gap: 24px;
      grid-template-columns: repeat(auto-fit, 135px);
      .anime-list-item-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        .anime-list-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .remove-btn {
          margin-top: auto;
          cursor: pointer;
          margin-top: 10px;
          border: none;
          background-color: red;
          color: var(--secondary-color);
          padding: 5px 10px;
          border-radius: 5px;
        }
      }
    }
  `,
};

function CollectionDetail() {
  const router = useRouter();
  const { collectionName } = router.query;
  const { collections, deleteAnimeFromCollection } = useAnimeCollections();

  if (!collections.some((collection) => collection.name === collectionName)) {
    return <Error404 />;
  }

  const currentCollection = collections.find(
    (collection) => collection.name === collectionName,
  );

  function removeAnimeFromCollection(anime: AnimeMediaModel) {
    if (
      window.confirm(
        `Are you sure you want to delete "${anime.title.userPreferred}" from collection?`,
      )
    ) {
      deleteAnimeFromCollection(collectionName as string, anime.id);
    }
  }

  return (
    <div className={styled.root}>
      <header>
        <button onClick={() => router.back()} className="back-btn">
          <Angle />
        </button>
        <h1 data-testid="title">{collectionName}</h1>
      </header>
      <ul className="anime-list">
        {currentCollection.animes.map((anime) => (
          <div className="anime-list-item-wrapper" key={anime.id}>
            <AnimeCard anime={anime} />
            <button
              className="remove-btn"
              data-testid={`remove-btn-${anime.id}`}
              onClick={() => removeAnimeFromCollection(anime)}
            >
              Remove
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CollectionDetail;
