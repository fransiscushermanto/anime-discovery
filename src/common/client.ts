import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import fetch from "cross-fetch";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import merge from "deepmerge";
import Cookie from "js-cookie";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, extensions, ...res }: any) => {
      if (res.status === 401 && !!Cookie.get("authorization")) {
        Cookie.remove("authorization");
      }

      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Status Code: ${res.status}`,
      );

      return { message, locations, ...res };
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_ANILIST_API_URL,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  try {
    const token = Cookie.get("authorization");
    return {
      headers: {
        ...headers,
        ...(token && { authorization: `Bearer ${token}` }),
      },
    };
  } catch (error) {
    console.log("error", error);
  }
});

function createApolloClient() {
  return new ApolloClient({
    defaultOptions: {
      query: {
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    ssrMode: typeof window === "undefined",
    link: from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache({
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
    }),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => {
        return [
          ...sourceArray,
          ...destinationArray.filter((d) =>
            sourceArray.every((s) => !isEqual(d, s)),
          ),
        ];
      },
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: ApolloClient<any>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
}
