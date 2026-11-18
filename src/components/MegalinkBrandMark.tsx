'use client';
interface MegalinkBrandMarkProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md';
}

export function MegalinkBrandMark({
  variant = 'light',
  size = 'md',
}: MegalinkBrandMarkProps) {
  const iconSize = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';
  const megaColor = variant === 'dark' ? 'text-white' : 'text-[#2563EB]';
  const linkColor = variant === 'dark' ? 'text-[#F1F5F9]' : 'text-[#111827]';

  return (
    <span className="inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0">
      {/* Exact isometric M + signal arcs emblem from uploaded MegaLink SVG */}
      <svg
        viewBox="0 0 245.92 245.92"
        className={`${iconSize} shrink-0`}
        aria-hidden="true"
      >
        <path
          fill="#2563eb"
          d="M218,0H27.96C12.58,0,0,12.58,0,27.96v190.04c0,15.38,12.58,27.96,27.96,27.96h190.04c15.38,0,27.96-12.58,27.96-27.96V27.96c0-15.38-12.58-27.96-27.96-27.96Z"
        />
        <g>
          <polygon
            fill="#d8d8d8"
            opacity="0.8"
            points="35.26 182.45 74.66 205.2 74.66 141.86 122.98 169.76 122.98 118.11 35.26 67.47 35.26 182.45"
          />
          <polygon
            fill="#efefef"
            opacity="0.8"
            points="210.7 182.45 171.3 205.2 171.3 141.86 122.98 169.76 122.98 118.11 210.7 67.47 210.7 182.45"
          />
          <polygon
            fill="#b7b7b7"
            opacity="0.8"
            points="74.66 205.2 111.28 184.02 111.28 163 74.66 141.86 74.66 205.2"
          />
          <polygon
            fill="#b7b7b7"
            opacity="0.8"
            points="171.3 205.2 134.68 184.02 134.68 163 171.3 141.86 171.3 205.2"
          />
          <path
            fill="#ffffff"
            opacity="0.58"
            d="M122.98,118.11l20.91-12.07c-4.18-7.22-11.97-12.08-20.91-12.08s-16.74,4.86-20.91,12.08l20.91,12.07Z"
          />
          <path
            fill="#ffffff"
            opacity="0.58"
            d="M93.07,100.84c5.98-10.32,17.15-17.29,29.91-17.29s23.93,6.96,29.91,17.29l6.58-3.8c-7.3-12.59-20.92-21.09-36.49-21.09s-29.19,8.49-36.49,21.09l6.58,3.8Z"
          />
          <path
            fill="#ffffff"
            opacity="0.58"
            d="M78.05,92.17c8.99-15.51,25.76-25.97,44.93-25.97s35.95,10.46,44.93,25.97l6.58-3.8c-10.3-17.78-29.53-29.77-51.51-29.77s-41.21,11.99-51.51,29.77l6.58,3.8Z"
          />
          <path
            fill="#ffffff"
            opacity="0.58"
            d="M62.61,83.26c12.08-20.84,34.61-34.89,60.37-34.89s48.3,14.05,60.37,34.89l6.58-3.8c-13.39-23.11-38.38-38.69-66.95-38.69s-53.56,15.59-66.95,38.69l6.58,3.8Z"
          />
        </g>
      </svg>

      {/* Geometric rounded small-caps italic wordmark matching Gotham Rounded lockup */}
      <span
        className="font-display inline-flex items-baseline italic -skew-x-6 tracking-tight leading-none"
        aria-label="MegaLink"
      >
        <span className={`font-extrabold ${megaColor} text-[22px]`}>M</span>
        <span className={`font-extrabold ${megaColor} text-[16px] mr-1`}>EGA</span>
        <span className={`font-medium ${linkColor} text-[22px]`}>L</span>
        <span className={`font-medium ${linkColor} text-[16px]`}>INK</span>
      </span>
    </span>
  );
}
