import * as React from "react";
import { SVGProps } from "react";

const Home = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="#000000"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48px"
    height="48px"
    {...props}
  >
    <linearGradient id="active-home" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop
        offset="47.24%"
        style={{
          stopColor: "#ff8f71",
          stopOpacity: 1,
        }}
      />
      <stop
        offset="120.34%"
        style={{
          stopColor: "#ef2d1a",
          stopOpacity: 1,
        }}
      />
    </linearGradient>
    <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9 C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52 C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z" />
  </svg>
);

export default Home;
