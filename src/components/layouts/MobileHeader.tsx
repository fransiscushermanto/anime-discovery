import { css, cx } from "@emotion/css";

import React, { memo } from "react";

interface MobileHeaderProps {
  className?: string;
}

const styled = {
  root: css`
    height: 100%;
    width: 100%;
    max-width: var(--mobile-width);
    max-height: var(--mobile-nav-height);
    position: fixed;
    top: 0;
    display: flex;
    z-index: 1;
    background-color: var(--primary-color);
    transition: background-color 0.2s ease-in, color 0.2s ease-in;

    &.sticky {
      &::after {
        content: "";
        position: absolute;
        background-color: transparent;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
      background-color: var(--secondary-color);
      color: var(--primary-color);
    }

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

      .avatar {
        cursor: pointer;
        position: relative;
        display: flex;
        width: 30px;
        height: 30px;
        margin-left: auto;

        .menu-dropdown {
          &:before {
            width: 0;
            height: 0;
            content: "";
            z-index: 2;
            transform: scale(1);
            border-bottom: 0.6rem solid var(--secondary-color);
            border-left: 0.4rem solid transparent;
            border-right: 0.4rem solid transparent;
            bottom: 100%;
            right: 10px;
            position: absolute;
          }
          list-style: none;
          color: var(--primary-color);
          z-index: -1;
          opacity: 0;
          margin: 0;
          padding: 10px 20px;
          border-radius: 8px;
          position: absolute;
          width: 150px;
          height: auto;
          margin-top: 20px;
          top: 100%;
          right: 0%;
          background-color: var(--secondary-color);
          transition: all ease-in 0.2s;
          .menu-item {
            cursor: pointer;
          }
        }
        &.menu-dropdown-open .menu-dropdown {
          opacity: 1;
          z-index: 1;
        }
      }
    }
  `,
};

function MobileHeader({ className }: MobileHeaderProps) {
  return (
    <header className={cx(styled.root, "header mobile-header", className)}>
      <nav>
        <div className="navbar-brand">
          <span>Anime Discovery.</span>
        </div>
      </nav>
    </header>
  );
}

export default memo(MobileHeader);
