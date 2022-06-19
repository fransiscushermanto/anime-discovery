import { css, cx } from "@emotion/css";
import { Collection } from "@hooks";
import { Trash } from "@shapes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CollectionCardProps {
  collection: Collection;
  onDelete: (collection: Collection) => void;
}

const styled = {
  root: css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.empty .delete-collection {
      svg {
        fill: var(--primary-color);
      }
    }

    .delete-collection {
      z-index: 1;
      cursor: pointer;
      background-color: transparent;
      position: absolute;
      top: 0%;
      right: 0%;
      margin-top: 10px;
      margin-right: 10px;
      width: fit-content;
      border: none;
      transition: all 0.2s ease-in;
      svg {
        width: 20px;
        height: 20px;
        fill: var(--secondary-color);
      }

      &:hover {
        svg {
          fill: var(--error-color);
        }
      }
    }

    .collection-cover {
      display: flex;
      width: inherit;
      height: inherit;
      border-radius: 10px;
      > * {
        border-radius: inherit;
      }
    }

    .name {
      position: absolute;
      bottom: 10%;
      transform: translateX(-50%);
      left: 50%;
      font-size: 13px;
      color: var(--secondary-color);
      background-color: var(--primary-color);
      padding: 5px 20px;
      border-radius: 5px;
    }
  `,
};

function CollectionCard({ collection, onDelete }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.name}`} passHref>
      <li
        data-testid="collection-list-item"
        className={cx("collection-list-item", styled.root, {
          empty: collection.animes.length < 1,
        })}
      >
        <button
          role="delete-btn"
          data-collection-name={collection.name}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(collection);
          }}
          className="delete-collection"
        >
          <Trash />
        </button>
        {collection.animes.length < 1 ? (
          <span data-testid={`placeholder-collection-cover-${collection.name}`}>
            No Anime
          </span>
        ) : (
          <div
            data-testid={`collection-cover-${collection.name}`}
            className="collection-cover"
          >
            <Image
              src={collection.animes[0].coverImage.large}
              width={135}
              height={300}
              alt={collection.name}
            />
          </div>
        )}
        <div className="name">{collection.name}</div>
      </li>
    </Link>
  );
}

export default CollectionCard;
