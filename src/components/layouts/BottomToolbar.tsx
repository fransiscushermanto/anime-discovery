import { css, cx } from "@emotion/css";
import { Box, Home } from "@shapes";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const styled = {
  root: css`
    height: 50px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: var(--primary-color);
    display: inline-flex;

    box-shadow: 0px 5px 4px 3px rgb(255 255 255);
    .bottom-toolbar-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      > svg {
        width: 25px;
        height: 25px;
        fill: var(--secondary-color);
      }

      &.active > svg {
        fill: url(#active-home);
      }
    }
  `,
};

function BottomToolbar() {
  const router = useRouter();
  const targetPath = router.pathname.split("/")[1];

  return (
    <div className={cx("bottom-toolbar", styled.root)}>
      <Link href="/" passHref>
        <div
          role="button"
          className={cx("bottom-toolbar-item", { active: targetPath === "" })}
        >
          <Home />
        </div>
      </Link>
      <Link href="/collection" passHref>
        <div
          role="button"
          className={cx("bottom-toolbar-item", {
            active: targetPath === "collection",
          })}
        >
          <Box />
        </div>
      </Link>
    </div>
  );
}

export default BottomToolbar;
