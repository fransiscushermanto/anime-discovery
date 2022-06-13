import type { AppProps } from "next/app";

import { Layout } from "@layouts";
import { ApolloProvider } from "@apollo/client";
import { AnimeCollectionProvider, useApollo } from "@hooks";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();

  if (router.pathname === "/" && router.asPath.includes("#access_token")) {
    router.replace("/");
  }

  return (
    <ApolloProvider client={apolloClient}>
      <AnimeCollectionProvider>
        <Layout withBottomToolbar={(Component as any).withBottomToolbar}>
          <Component {...pageProps} />
        </Layout>
      </AnimeCollectionProvider>
      <style jsx global>
        {`
          :root {
            --primary-color: #15141f;
            --secondary-color: #ffffff;
            --tertiary-color: linear-gradient(
              244.07deg,
              #ff8f71 47.24%,
              #ef2d1a 120.34%
            );
            --error-color: red;
            --default-transition-duration: 0.2s;
            --default-transition-property-background: background-color,
              background-image, background-position;
            --bottom-toolbar-height: 50px;
            --mobile-nav-height: 50px;
            --nav-height: 70px;
            --mobile-width: 500px;
          }

          *,
          :after,
          :before {
            box-sizing: border-box;
          }

          body {
            font-family: "Lato", sans-serif;
            color: var(--secondary-color);
            margin: 0;
          }

          body,
          #__next {
            min-height: 100vh;
          }

          .modal {
            position: fixed;
            width: 100%;
            height: 100%;
            max-height: 100vh;
            top: 0;
            left: 50%;
            z-index: 1;
            transform: translateX(-50%);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: -1;
          }

          .modal .modal-body {
            background-color: var(--secondary-color);
            color: var(--primary-color);
            border-radius: 8px;
          }

          @media screen and (max-width: 768px) {
            .modal {
              max-width: var(--mobile-width);
            }
          }
        `}
      </style>
    </ApolloProvider>
  );
}

export default MyApp;
