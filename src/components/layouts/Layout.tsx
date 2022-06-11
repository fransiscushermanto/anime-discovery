import { css, cx } from "@emotion/css";
import { useMediaQuery } from "@hooks";
import React from "react";
import BottomToolbar from "./BottomToolbar";
import MobileHeader from "./MobileHeader";

interface LayoutProps extends Record<string, any> {
  children: React.ReactNode;
  withBottomToolbar?: boolean;
}

const styled = {
  root: css`
    display: flex;
    height: auto;
    flex-direction: column;
    align-items: center;
    > .wrapper {
      position: relative;
      background-color: var(--primary-color);
      width: 100%;
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      > *:not(.bottom-toolbar) {
        overflow-y: auto;
      }
      @media (max-width: 768px) {
        max-width: 500px;

        &.with-bottom-toolbar > *:not(.bottom-toolbar):not(.header) {
          max-height: calc(
            100vh - var(--bottom-toolbar-height) - var(--mobile-nav-height)
          );
          margin-top: var(--mobile-nav-height);
          margin-bottom: var(--bottom-toolbar-height);
        }
      }
    }
  `,
};

function Layout({ children, withBottomToolbar }: LayoutProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={styled.root}>
      <div
        className={cx("wrapper", {
          "with-bottom-toolbar": withBottomToolbar && isMobile,
        })}
      >
        {isMobile && <MobileHeader />}
        {children}
        {isMobile && withBottomToolbar && <BottomToolbar />}
      </div>
    </div>
  );
}

export default Layout;
