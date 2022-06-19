import { css } from "@emotion/css";
import { useGetAnimeList } from "api-hooks/anime";
import { Pagination } from "@elements";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AnimeCard from "./AnimeCard";
import { allAnimeListVariables } from "./constants";

const styled = {
  root: css`
    padding: 20px 28px;
    @media (max-width: 375px) {
      padding-left: 0;
      padding-right: 0;
    }
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
  const { data, fetchMore, client } = useGetAnimeList({
    variables: allAnimeListVariables,
    notifyOnNetworkStatusChange: true,
  });
  const currentPage = router.query.page
    ? parseInt(router.query.page as string)
    : allAnimeListVariables.page;

  console.log("curentPage", currentPage, "anime list", data);

  function onPageChange(page: number) {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  useEffect(() => {
    if (!router.query.page && data.Page.pageInfo.currentPage !== 1) {
      fetchMore({ variables: allAnimeListVariables });
    }
  }, [data.Page.pageInfo.currentPage, fetchMore, router.query]);

  useEffect(() => {
    return () => {
      client.clearStore();
    };
  }, []);

  return (
    <div className={styled.root}>
      <ul className="anime-list">
        {data?.Page?.media
          .slice(0, allAnimeListVariables.perPage)
          .map((anime) => (
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
