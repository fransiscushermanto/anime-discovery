import { css, cx } from "@emotion/css";
import { useAnimeCollections } from "@hooks";
import { Cross } from "@shapes";
import { AnimeMediaModel } from "api-hooks/anime";
import { ModalProps } from "@elements";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface AddToCollectionModalProps extends ModalProps {
  onAddAnimeToCollection: (collectionName: string) => void;
  currentAnime: AnimeMediaModel;
}

const styled = {
  root: css`
    .modal-body {
      position: relative;
      margin: 0 auto;
      width: 100%;
      max-width: 400px;
      padding: 20px 20px;
      min-height: unset;
      .close {
        cursor: pointer;
        position: absolute;
        right: 0;
        margin-right: 20px;
        svg {
          width: 20px;
          height: 20px;
        }
      }

      .collection-list {
        list-style-type: none;
        margin: 0;
        padding: 0;

        .collection-list-item {
          cursor: pointer;
          &:not(:last-child) {
            margin-bottom: 10px;
          }
          color: var(--secondary-color);
          border-radius: 10px;
          width: fit-content;
          padding: 10px 20px;
          background-color: var(--primary-color);
          &:not(&.selected):hover {
            background-image: var(--tertiary-color);
          }

          &::before {
            content: "+ ";
          }

          &.selected {
            cursor: not-allowed;
            &::before {
              content: "✓ ";
            }
            background-color: green;
          }
        }
      }

      form {
        margin-top: 20px;
        .form-group {
          display: flex;
          flex-direction: column;

          label {
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 10px;
          }
          input {
            padding: 5px 10px;
            border: 1px solid rgba(0, 0, 0, 0.5);
            border-radius: 5px;
            &.invalid {
              border: 1px solid var(--error-color);
            }
          }

          .error {
            color: var(--error-color);
            font-size: 10px;
            margin-top: 5px;
          }
        }
        .add-btn {
          margin-top: 10px;
          cursor: pointer;
          width: 100%;
          background-color: transparent;
          border: 1px solid blue;
          color: blue;
          padding: 5px 10px;
          border-radius: 8px;
          transition: all 0.2s ease-in-out;

          &:hover {
            background-color: blue;
            color: var(--secondary-color);
          }
        }
      }

      .not-found-collection {
        font-size: 12px;
        margin-top: 20px;
        .action {
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            background-image: var(--tertiary-color);
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  `,
};

function AddToCollectionModal({
  onClose,
  onAddAnimeToCollection,
  currentAnime,
}: AddToCollectionModalProps) {
  const { collections, getAnimeCollections, addCollection } =
    useAnimeCollections();
  const [name, setName] = useState("");
  const [error, setError] = useState<{
    message: string;
    invalid: boolean;
  } | null>();
  const [isOpenAddNewCollectionForm, setIsOpenAddNewCollectionForm] =
    useState(false);

  const animeCollections = useMemo(
    () => getAnimeCollections(currentAnime.id),
    [currentAnime.id, getAnimeCollections],
  );

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      if (name === "") {
        setError({ message: "Name is required", invalid: true });
        return;
      }

      if (
        collections.some(
          (collection) => collection.name.toLowerCase() === name.toLowerCase(),
        )
      ) {
        setError({ message: "Collection name already exists", invalid: true });
        return;
      }

      if (error?.invalid) return;
      addCollection({ name, animes: [currentAnime] });
      onClose();
    },
    [name, collections, error?.invalid, addCollection, currentAnime, onClose],
  );

  function validateChange(value) {
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) {
      setError({
        message: "Name may not have special character",
        invalid: true,
      });
      return;
    }
    setError(null);
  }

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, [isOpenAddNewCollectionForm]);

  return (
    <div
      data-testid="add-to-collection-modal"
      className={cx("modal", styled.root)}
    >
      <div className="modal-overlay" />
      <div className="modal-body">
        <div onClick={onClose} className="close">
          <Cross />
        </div>
        {isOpenAddNewCollectionForm ? (
          <form data-testid="new-collection-form" onSubmit={handleSave}>
            <div className="form-group">
              <label>Collection Name</label>
              <input
                name="collection"
                role="textbox"
                type="text"
                value={name}
                className={cx({ invalid: error?.invalid })}
                onChange={(e) => {
                  setName(e.target.value);
                  validateChange(e.target.value);
                }}
              />
              {error?.message && <div className="error">{error.message}</div>}
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
        ) : (
          <ul data-testid="collection-list" className="collection-list">
            {collections.map((collection) => {
              const selected = animeCollections.some(
                (animeCollection) => animeCollection.name === collection.name,
              );

              return (
                <li
                  role="button"
                  key={collection.name}
                  className={cx("collection-list-item", {
                    selected,
                  })}
                  onClick={() =>
                    !selected && onAddAnimeToCollection(collection.name)
                  }
                >
                  Add to {collection.name} Collection
                </li>
              );
            })}
          </ul>
        )}

        <div className="not-found-collection">
          {isOpenAddNewCollectionForm ? (
            <span>
              Choose from existing collection?{" "}
              <span
                onClick={() => setIsOpenAddNewCollectionForm(false)}
                className="action"
              >
                Back
              </span>
            </span>
          ) : (
            <span>
              Collection not found?{" "}
              <span
                onClick={() => setIsOpenAddNewCollectionForm(true)}
                className="action"
              >
                Add new
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddToCollectionModal;
