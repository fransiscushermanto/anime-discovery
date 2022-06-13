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

  const userPrefferedTitle = (res.data.Media.title.userPreferred ?? "")
    .replace(/[ :]/g, "-")
    .replace(/--/g, "-")
    .replace(/\//g, "");
  const englishTitle = (res.data.Media.title.english ?? "")
    .replace(/[ :]/g, "-")
    .replace(/--/g, "-")
    .replace(/\//g, "");

  const nativeTitle = (res.data.Media.title.native ?? "")
    .replace(/[ :]/g, "-")
    .replace(/--/g, "-")
    .replace(/\//g, "");

  const romajiTitle = (res.data.Media.title.romaji ?? "")
    .replace(/[ :]/g, "-")
    .replace(/--/g, "-")
    .replace(/\//g, "");

  console.log(
    romajiTitle,
    englishTitle,
    nativeTitle,
    userPrefferedTitle,
    context.query.animeName,
  );

  const notFound =
    userPrefferedTitle !== context.query.animeName &&
    englishTitle !== context.query.animeName &&
    nativeTitle !== context.query.animeName &&
    romajiTitle !== context.query.animeName;

  return addApolloState(apolloClient, { props: { notFound } });
}

function AnimeDetailPage({ notFound }) {
  if (notFound) {
    return <Error404 />;
  }

  return <Anime />;
}

export default AnimeDetailPage;
