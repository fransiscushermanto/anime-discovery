import { setMobileCSSHeightProperty } from "@common/helpers/functions";
import { css, cx } from "@emotion/css";
import { useMediaQuery } from "@hooks";
import React, { useEffect, useState } from "react";
import BottomToolbar from "./BottomToolbar";
import DesktopHeader from "./DesktopHeader";
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
      --mobile-max-height: calc(var(--vh, 1vh) * 100);

      position: relative;
      background-color: var(--primary-color);
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      @media (max-width: 768px) {
        min-height: calc(var(--mobile-max-height) - var(--mobile-nav-height));
      }
      > *:not(.bottom-toolbar):not(.header) {
        height: auto;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin-top: var(--nav-height);
        > * {
          min-height: 100vh;
        }
        @media (max-width: 768px) {
          min-height: calc(var(--mobile-max-height) - var(--mobile-nav-height));
          > * {
            min-height: calc(
              var(--mobile-max-height) - var(--mobile-nav-height)
            );
          }
        }
      }
      @media (max-width: 768px) {
        max-width: var(--mobile-width);
        height: auto;
        header + * {
          margin-top: var(--mobile-nav-height);
        }

        &.with-bottom-toolbar > *:not(.bottom-toolbar):not(.header) {
          /* max-height: calc(
            var(--mobile-max-height) - var(--bottom-toolbar-height) -
              var(--mobile-nav-height)
          ); */
          margin-bottom: var(--bottom-toolbar-height);
        }
      }
    }
  `,
};

function Layout({ children, withBottomToolbar }: LayoutProps) {
  const [isStickyHeader, setIsStickyHeader] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setMobileCSSHeightProperty();
  }, []);

  useEffect(() => {
    function handleOnScroll() {
      setIsStickyHeader(window.scrollY > 50);
    }

    window.addEventListener("resize", () => {
      if (isMobile) {
        setMobileCSSHeightProperty();
      }
    });

    document.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("resize", () => {
        if (isMobile) {
          setMobileCSSHeightProperty();
        }
      });
      document.removeEventListener("scroll", handleOnScroll);
    };
  }, [isMobile]);

  return (
    <div className={styled.root}>
      <div
        className={cx("wrapper", {
          "with-bottom-toolbar": withBottomToolbar && isMobile,
        })}
      >
        {isMobile ? (
          <MobileHeader className={cx({ sticky: isStickyHeader })} />
        ) : (
          <DesktopHeader className={cx({ sticky: isStickyHeader })} />
        )}
        <main id="content-wrapper">{children}</main>
        {isMobile && withBottomToolbar && <BottomToolbar />}
      </div>
    </div>
  );
}

export default Layout;
