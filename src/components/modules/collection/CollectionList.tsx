import { css, cx } from "@emotion/css";
import { Collection, useAnimeCollections } from "@hooks";
import { Add } from "@shapes";
import React, { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import TemporaryCollectionCard from "./TemporaryCollectionCard";

const styled = {
  root: css`
    padding: 0px 28px 20px;
    @media (max-width: 375px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    .collection-list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      display: grid;
      grid-template-columns: repeat(auto-fit, 135px);
      column-gap: 10px;
      row-gap: 10px;
      .collection-list-item {
        cursor: pointer;
        height: 230px;
        width: 100%;
        max-width: 135px;

        &.temporary,
        &.placeholder,
        &.empty {
          border-radius: 10px;
        }

        &.temporary,
        &.empty {
          color: var(--primary-color);
          background-color: rgba(255, 255, 255, 0.9);
        }

        &.placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: initial;
          border: 1px solid var(--secondary-color);
          transition-property: var(--default-transition-property-background);
          transition-duration: var(--default-transition-duration);
          &:hover {
            background-image: var(--tertiary-color);
            .add-icon {
              fill: var(--secondary-color);
            }
          }
          .add-icon {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  `,
};

function CollectionList() {
  const { collections, addCollection, deleteCollection } =
    useAnimeCollections();
  const [localCollections, setLocalCollections] = useState(collections);

  function addTemporaryCollection() {
    setLocalCollections((prev) => [
      ...prev.filter((collection) => collection.name !== ""),
      { name: "" },
    ]);
  }

  function saveTemporaryCollection(args: { name: string }) {
    addCollection(args);
    setLocalCollections((prev) => [
      ...prev.filter((collection) => collection.name !== ""),
      { name: args.name, animes: [] },
    ]);
  }

  function cancleTemporaryCollection() {
    setLocalCollections((prev) => [
      ...prev.filter((collection) => collection.name !== ""),
    ]);
  }

  function showConfirmationDeleteCollection(collection: Collection) {
    if (
      window.confirm(
        `Are you sure you want to delete "${collection.name}" anime collection?`,
      )
    ) {
      setLocalCollections((prev) => [
        ...prev.filter((c) => c.name !== collection.name),
      ]);
      deleteCollection(collection.name);
    }
  }

  useEffect(() => {
    setLocalCollections(collections);
  }, [collections]);

  return (
    <div className={styled.root}>
      <h3>Anime Collection</h3>
      <ul className="collection-list">
        {localCollections.map((collection, i) =>
          collection.name === "" ? (
            <TemporaryCollectionCard
              key={i}
              onSave={saveTemporaryCollection}
              onCancel={cancleTemporaryCollection}
            />
          ) : (
            <CollectionCard
              key={collection.name}
              onDelete={showConfirmationDeleteCollection}
              collection={collection}
            />
          ),
        )}
        <li
          className="collection-list-item placeholder"
          onClick={addTemporaryCollection}
        >
          <Add className="add-icon" />
        </li>
      </ul>
    </div>
  );
}

export default CollectionList;
