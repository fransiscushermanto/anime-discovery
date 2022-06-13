import { css } from "@emotion/css";
import React from "react";

const styled = {
  root: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
};

function Error404() {
  return <div className={styled.root}>404 Not Found</div>;
}

export default Error404;
