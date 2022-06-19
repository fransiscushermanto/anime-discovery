import { addApolloState, initializeApollo } from "@common/client";
import { ANIME_LIST_QUERY } from "@graphql/anime";
import { allAnimeListVariables, AnimeList } from "@modules";
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentPage = context.query.page
    ? parseInt(context.query.page as string)
    : allAnimeListVariables.page;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ANIME_LIST_QUERY,
    variables: { ...allAnimeListVariables, page: currentPage },
  });

  const pageProps = addApolloState(apolloClient, { props: {} });

  return pageProps;
}

export default function HomePage() {
  return <AnimeList />;
}

HomePage.withBottomToolbar = true;
