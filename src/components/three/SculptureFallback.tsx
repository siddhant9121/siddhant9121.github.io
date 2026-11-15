/* Shown while the 3D scene loads and wherever WebGL is unavailable */
export function SculptureFallback() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="absolute right-[-10%] top-1/2 h-[80%] max-h-[640px] -translate-y-1/2 opacity-60 md:right-[2%]"
      fill="none"
      aria-hidden
    >
      <circle cx="300" cy="300" r="110" fill="#11151B" stroke="#262C35" />
      <ellipse cx="300" cy="300" rx="170" ry="60" stroke="#C5A46D" strokeWidth="1" transform="rotate(-24 300 300)" />
      <ellipse cx="300" cy="300" rx="210" ry="96" stroke="#C5A46D" strokeWidth="1" transform="rotate(38 300 300)" />
      <ellipse cx="300" cy="300" rx="245" ry="70" stroke="#527C68" strokeWidth="1" transform="rotate(80 300 300)" />
    </svg>
  );
}
