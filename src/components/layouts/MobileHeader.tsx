import { css, cx } from "@emotion/css";
import Link from "next/link";
import React from "react";

const styled = {
  root: css`
    height: 100%;
    width: 100%;
    max-height: var(--mobile-nav-height);
    position: absolute;
    top: 0;
    display: flex;
    nav {
      display: inline-flex;
      width: 100%;
      height: 100%;
      align-items: center;
      padding: 0 20px;
      .navbar-brand {
        font-weight: bold;
      }
      .login-btn {
        border-radius: 10px;
        margin-left: auto;
        background-color: var(--secondary-color);
        border: none;
        padding: 8px 10px;
        transition-property: var(--default-transition-property-background);
        transition-duration: var(--default-transition-duration);
        &:focus,
        &:hover {
          background-image: var(--tertiary-color);
          color: var(--secondary-color);
        }
      }
    }
  `,
};

const OAUTH_URL = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID}&response_type=token`;

function MobileHeader() {
  return (
    <header className={cx(styled.root, "header mobile-header")}>
      <nav>
        <div className="navbar-brand">
          <span>Anime Discovery.</span>
        </div>
        <Link href={OAUTH_URL} passHref>
          <button className="login-btn">Login</button>
        </Link>
      </nav>
    </header>
  );
}

export default MobileHeader;
