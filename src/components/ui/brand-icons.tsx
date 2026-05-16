import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function svgProps(size: number | undefined, rest: IconProps): React.SVGProps<SVGSVGElement> {
  const dim = size ?? 24;
  return {
    xmlns: "http://www.w3.org/2000/svg",
    width: dim,
    height: dim,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    focusable: false,
    ...rest,
  };
}

export function Github({ size, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)}>
      <path d="M12 .5C5.73.5.97 5.26.97 11.54c0 4.86 3.15 8.99 7.52 10.45.55.1.75-.24.75-.53 0-.26-.01-.96-.01-1.88-3.06.66-3.71-1.47-3.71-1.47-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.69 1.13 1.69 1.13.99 1.69 2.59 1.2 3.22.92.1-.72.39-1.2.7-1.48-2.45-.28-5.02-1.23-5.02-5.46 0-1.21.43-2.2 1.13-2.97-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.03 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.89.12 2.77.36 2.1-1.43 3.03-1.13 3.03-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.76 1.13 2.97 0 4.24-2.58 5.17-5.04 5.44.4.34.75 1 .75 2.02 0 1.46-.01 2.64-.01 3 0 .29.2.64.76.53 4.36-1.46 7.51-5.59 7.51-10.45C23.03 5.26 18.27.5 12 .5z" />
    </svg>
  );
}

export function Linkedin({ size, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function Twitter({ size, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
