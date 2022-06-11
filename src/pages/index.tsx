import { addApolloState, initializeApollo } from "@common/client";
import { ANIME_LIST_QUERY } from "@graphql/anime";
import { allAnimeListVariables, Landing } from "@modules";
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

  return addApolloState(apolloClient, { props: {} });
}

export default function HomePage() {
  return <Landing />;
}

HomePage.withBottomToolbar = true;
