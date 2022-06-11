import { css } from "@emotion/css";
import { useGetAnimeList } from "api-hooks/anime";
import Pagination from "components/elements/Pagination";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRef } from "react";
import AnimeCard from "./AnimeCard";
import { allAnimeListVariables } from "./constants";

const styled = {
  root: css`
    height: 100%;
    padding: 44px 28px;
    display: flex;
    flex-direction: column;
    .anime-list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      display: grid;
      justify-content: center;
      column-gap: 22px;
      row-gap: 24px;
      grid-template-columns: repeat(auto-fit, 135px);

      margin-bottom: 40px;
    }

    .anime-list-pagination {
      margin-top: auto;
      justify-content: center;
    }
  `,
};

function AnimeList() {
  const router = useRouter();
  const rootRef = useRef(null);
  const { data, fetchMore } = useGetAnimeList({
    variables: allAnimeListVariables,
    notifyOnNetworkStatusChange: true,
  });
  const currentPage = router.query.page
    ? parseInt(router.query.page as string)
    : allAnimeListVariables.page;

  function onPageChange(page: number) {
    rootRef.current.scrollTo({ top: 0, behavior: "smooth" });
    router.push(
      {
        query: {
          ...router.query,
          page,
        },
      },
      undefined,
      { shallow: true },
    );
    fetchMore({
      variables: {
        ...allAnimeListVariables,
        page,
      },
    });
  }

  return (
    <div ref={rootRef} className={styled.root}>
      <ul className="anime-list">
        {data?.Page?.media.map((anime) => (
          <AnimeCard anime={anime} key={anime.id} />
        ))}
      </ul>
      <Pagination
        className="anime-list-pagination"
        currentPage={currentPage}
        shownPages={3}
        totalPages={data?.Page?.pageInfo.lastPage}
        minPageIndex={1}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default AnimeList;
