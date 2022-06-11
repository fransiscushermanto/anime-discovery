import { addApolloState, initializeApollo } from "@common/client";
import { ANIME_QUERY } from "@graphql/anime";
import { Anime } from "@modules";
import { GetServerSidePropsContext } from "next";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ANIME_QUERY,
    variables: { id: context.query.animeId },
  });

  return addApolloState(apolloClient, { props: {} });
}

function AnimeDetailPage() {
  return <Anime />;
}

export default AnimeDetailPage;
