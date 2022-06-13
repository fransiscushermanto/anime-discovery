import { addApolloState, initializeApollo } from "@common/client";
import { ANIME_QUERY } from "@graphql/anime";
import { Error404 } from "@layouts";
import { Anime } from "@modules";
import { GetServerSidePropsContext } from "next";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({
    query: ANIME_QUERY,
    variables: { id: context.query.animeId },
  });

  const notFound =
    res.data.Media.title.userPreferred
      .replace(/[ :]/g, "-")
      .replace(/--/g, "-")
      .replace(/\//g, "") !== context.query.animeName;

  return addApolloState(apolloClient, { props: { notFound } });
}

function AnimeDetailPage({ notFound }) {
  if (notFound) {
    return <Error404 />;
  }

  return <Anime />;
}

export default AnimeDetailPage;
