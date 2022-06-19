import { InMemoryCache } from "@apollo/client";
import { render, RenderOptions } from "@testing-library/react";
import { AnimeCollectionProvider, useApollo } from "../hooks";
import { MockedResponse, MockedProvider } from "@apollo/client/testing";

const Providers = ({ children, mocks, initialState }) => {
  return (
    <MockedProvider
      mocks={mocks}
      cache={new InMemoryCache({
        addTypename: false,
        typePolicies: {
          Query: {
            fields: {
              Page: {
                keyArgs: false,
                merge(_, incoming) {
                  return incoming;
                },
              },
              Media: {
                keyArgs: false,
                merge(_, incoming) {
                  return incoming;
                },
              },
              AniChartUser: {
                keyArgs: false,
                merge(_, incoming) {
                  return incoming;
                },
              },
            },
          },
        },
      }).restore(initialState)}
      addTypename={false}
    >
      <AnimeCollectionProvider>{children}</AnimeCollectionProvider>
    </MockedProvider>
  );
};

const customRender = (
  node: JSX.Element | null,
  apolloClient: {
    mocks: MockedResponse[];
    initialState: any;
  },
  options: RenderOptions = {},
) =>
  render(node, {
    wrapper: ({ children }) => (
      <Providers
        mocks={apolloClient.mocks}
        initialState={apolloClient.initialState}
      >
        {children}
      </Providers>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
