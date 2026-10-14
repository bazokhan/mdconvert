import type { SVGProps } from "react";

/**
 * Geometric MD mark — the legacy of every text-editor icon since 1975,
 * trimmed down to two clean strokes. 24x24 viewBox, currentColor so it
 * inverts for dark mode and picks up text color in any context.
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      {/* M: two verticals + V */}
      <path d="M3 6 L3 18" />
      <path d="M3 6 L7 13 L11 6" />
      <path d="M11 6 L11 18" />
      {/* D: vertical + half-arc */}
      <path d="M14 6 L14 18" />
      <path d="M14 6 L17 6 Q21 6 21 12 Q21 18 17 18 L14 18" />
    </svg>
  );
}
