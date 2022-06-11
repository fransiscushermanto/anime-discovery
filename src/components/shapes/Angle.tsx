import * as React from "react";
import { SVGProps } from "react";

const Angle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24.274 27.7561C25.2366 28.7176 25.2366 30.2759 24.306 31.2706C23.8247 31.7679 23.215 32 22.5733 32C21.9636 32 21.3539 31.7679 20.9047 31.2706L9.70594 19.7655C9.25671 19.3014 9 18.6714 9 18.0083C9 17.3452 9.25671 16.7152 9.70594 16.251L20.9047 4.746C21.8353 3.75133 23.3434 3.75133 24.306 4.746C25.2366 5.70752 25.2366 7.29899 24.274 8.26051L14.808 18.0083L24.274 27.7561Z"
      fill="white"
    />
  </svg>
);

export default Angle;
