import { css } from "@emotion/css";
import { Angle } from "@shapes";
import { useGetAnime } from "api-hooks/anime";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const styled = {
  root: css`
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    .back-btn {
      cursor: pointer;
      width: fit-content;
      background-color: transparent;
      border: none;
      margin-bottom: 10px;
      > svg {
        width: 20px;
        height: 20px;
      }
    }
    .top-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .banner-image {
        position: relative;
        display: flex;
        border-radius: 1rem;
        * {
          border-radius: 1rem;
        }

        .add-to-collection-btn {
          position: absolute;
          bottom: 3%;
          right: 5%;

          width: 40px;
          height: 40px;
          background-color: transparent;
          color: var(--secondary-color);
          border: none;
          border-radius: 14px;
          font-size: 1rem;
          background-image: var(--tertiary-color);
        }
      }

      .title {
        font-weight: 500;
        font-size: 24px;
      }
    }
  `,
};

function Anime() {
  const router = useRouter();
  const { animeId } = router.query;
  const { data } = useGetAnime({ variables: { id: animeId } });

  return (
    <div className={styled.root}>
      <button onClick={() => router.back()} className="back-btn">
        <Angle />
      </button>
      <div className="top-wrapper">
        <div className="banner-image">
          <Image
            width={400}
            height={600}
            src={data.Media.coverImage.extraLarge}
            alt={data.Media.title.userPreferred}
          />
          <button className="add-to-collection-btn">+</button>
        </div>
        <h3 className="title">{data.Media.title.userPreferred}</h3>
        <p dangerouslySetInnerHTML={{ __html: data.Media.description }} />
      </div>
    </div>
  );
}

export default Anime;
