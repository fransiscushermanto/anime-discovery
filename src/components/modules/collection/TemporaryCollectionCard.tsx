import { css, cx } from "@emotion/css";
import { useAnimeCollections } from "@hooks";
import { Check, Cross } from "@shapes";
import React, { useCallback, useState } from "react";

interface TemporaryCollectionCardProps {
  onSave: (args: { name: string }) => void;
  onCancel: () => void;
}

const styled = {
  root: css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: default !important;

    .form-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 0 10px;

      --width: 100%;
      .input-name {
        width: var(--width);
        background-color: transparent;
        color: var(--primary-color);
        border: none;
        border-bottom: 1px solid var(--primary-color);
        &.invalid {
          border-bottom: 1px solid var(--error-color);
        }
      }

      .message {
        color: var(--error-color);
        margin-top: 5px;
        font-size: 9px;
        display: block;
        width: var(--width);
      }
    }

    .action-wrapper {
      position: absolute;
      bottom: 5%;
      .action-btn {
        background-color: transparent;
        border: none;
        height: auto;
        width: fit-content;
        cursor: pointer;
        svg {
          width: 25px;
          height: 25px;
        }
      }
    }
  `,
};

function TemporaryCollectionCard({
  onSave,
  onCancel,
}: TemporaryCollectionCardProps) {
  const { collections } = useAnimeCollections();
  const [name, setName] = useState("");
  const [error, setError] = useState<{
    message: string;
    invalid: boolean;
  } | null>();

  const handleSave = useCallback(() => {
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

    onSave({ name });
  }, [collections, name, onSave, error]);

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

  return (
    <li
      data-testid="temporary-collection-list-item"
      className={cx("collection-list-item temporary", styled.root)}
    >
      <div className="form-group">
        <input
          role="textbox"
          name="collection"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateChange(e.target.value);
          }}
          autoFocus
          className={cx("input-name", { invalid: error?.invalid })}
          type="text"
        />
        {error?.message && <span className="message">{error.message}</span>}
      </div>
      <div className="action-wrapper">
        <button role="cancel-btn" onClick={onCancel} className="cancel action-btn">
          <Cross fill="red" />
        </button>
        <button role="submit-btn" onClick={handleSave} className="save action-btn">
          <Check fill="green" />
        </button>
      </div>
    </li>
  );
}

export default TemporaryCollectionCard;
