import { css } from "@emotion/css";
import React from "react";
import CollectionList from "./CollectionList";

function Collection() {
  //   return <>{isAuthenticated ? <CollectionList /> : <CollectionWarning />}</>;
  return (
    <>
      <CollectionList />
    </>
  );
}

export default Collection;
