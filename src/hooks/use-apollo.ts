import { APOLLO_STATE_PROP_NAME, initializeApollo } from "@common/client";
import { useMemo } from "react";

export default function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
