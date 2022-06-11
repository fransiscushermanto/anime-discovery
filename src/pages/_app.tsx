import type { AppProps } from "next/app";

import { Layout } from "@layouts";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@hooks";
function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout withBottomToolbar={(Component as any).withBottomToolbar}>
        <Component {...pageProps} />
      </Layout>
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
            --default-transition-duration: 0.2s;
            --default-transition-property-background: background-color,
              background-image, background-position;
            --bottom-toolbar-height: 50px;
            --mobile-nav-height: 50px;
          }

          body {
            font-family: "Lato", sans-serif;
            color: var(--secondary-color);
            overflow: hidden;
            margin: 0;
          }

          body,
          #__next {
            min-height: 100vh;
          }
        `}
      </style>
    </ApolloProvider>
  );
}

export default MyApp;
