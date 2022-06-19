import { css, cx } from "@emotion/css";
import React, { ReactElement } from "react";

interface PaginationProps {
  totalPages: number;
  shownPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  minPageIndex?: number;
  className?: string;
}

const styled = {
  pagination: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    > *:not(:last-child) {
      margin-right: 10px;
    }
  `,
  button: css`
    cursor: pointer;
    width: 35px;
    height: 35px;
    transition-timing-function: ease-in-out;
    transition-property: background-image;
    border: none;
    clip-path: circle();
    color: var(--secondary-color);
    background-color: transparent;
    background-image: none;

    padding: 5px;

    &.active,
    &:hover {
      background-image: var(--tertiary-color);
    }
  `,
};

function Pagination({
  totalPages = 1,
  shownPages = 10,
  currentPage = 1,
  minPageIndex = 1,
  onPageChange,
  className,
}: PaginationProps) {
  const renderPageNumbers = React.useCallback(() => {
    if (shownPages < 3) {
      throw new Error("shownPages must be greater than 3");
    }

    const minimumShownablePageLength = shownPages > 5 ? 11 : shownPages * 2 - 1;
    const pageNumberElements: ReactElement[] | never = [];
    const difference = Math.round(shownPages / 2);
    const currentDifferenceWithTotalPages = totalPages - currentPage;
    const currentDifferenceWithFistPage = currentPage - minPageIndex;

    const isDisableHidingPageNumber =
      totalPages < minimumShownablePageLength ||
      (totalPages <= shownPages && totalPages - shownPages <= 2);

    const isPositionFirst =
      isDisableHidingPageNumber ||
      currentDifferenceWithFistPage <= shownPages - 1;

    const isPositionLast =
      isDisableHidingPageNumber ||
      currentDifferenceWithTotalPages <=
        (totalPages > minimumShownablePageLength
          ? shownPages - 1
          : shownPages - 2);

    const startIndex = isPositionFirst
      ? minPageIndex
      : isPositionLast
      ? /* Check current page is the first page of (n) last page */
        currentPage + shownPages - 1 === totalPages
        ? /* If yes render page start from (totalPages - shownablePageLength - 1) */
          totalPages - shownPages - 1
        : /* else just render start from totalPages - shownablePageLength */
          totalPages - shownPages
      : currentPage - difference;

    const targetIndex = isPositionFirst
      ? isDisableHidingPageNumber
        ? totalPages - 1
        : currentPage === shownPages
        ? shownPages + 1
        : shownPages
      : isPositionLast
      ? totalPages - 1
      : currentPage + (difference - 1);

    for (let index = startIndex; index < targetIndex; index++) {
      pageNumberElements.push(
        <button
          key={index}
          className={cx("page", styled.button, {
            active: currentPage === index + 1,
          })}
          onClick={() => onPageChange(index + 1)}
          data-testid={`page-${index + 1}`}
        >
          {index + 1}
        </button>,
      );
    }

    return (
      <>
        {!isPositionFirst ? (
          <div className="separator">
            <span>...</span>
          </div>
        ) : null}
        {pageNumberElements}
        {!isPositionLast && typeof totalPages === "number" ? (
          <div className="separator">
            <span>...</span>
          </div>
        ) : null}
      </>
    );
  }, [currentPage, minPageIndex, onPageChange, shownPages, totalPages]);

  return (
    <div className={cx("pagination", styled.pagination, className)}>
      <button
        className={cx("page", styled.button, {
          active: currentPage === minPageIndex,
        })}
        onClick={() => onPageChange(minPageIndex)}
        data-testid={`page-${minPageIndex}`}
      >
        {minPageIndex}
      </button>
      {renderPageNumbers()}
      {totalPages > minPageIndex ? (
        <button
          className={cx("page", styled.button, {
            active: currentPage === totalPages,
          })}
          onClick={() => onPageChange(totalPages)}
          data-testid={`page-${totalPages}`}
        >
          {totalPages}
        </button>
      ) : null}
    </div>
  );
}

export default Pagination;
