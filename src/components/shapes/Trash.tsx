import * as React from "react";
import { SVGProps } from "react";

const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height="512px"
    id="Layer_1"
    viewBox="0 0 512 512"
    width="512px"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g>
      <path d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z" />
      <g>
        <rect height={241} width={14} x={249} y={160} />
        <polygon points="320,160 305.4,160 294.7,401 309.3,401   " />
        <polygon points="206.5,160 192,160 202.7,401 217.3,401   " />
      </g>
    </g>
  </svg>
);

export default Trash;
