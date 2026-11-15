/* Shared between the DOM and the WebGL scene. Written by pointer and
   scroll handlers, read inside useFrame. Kept outside React state so
   that updating it never causes a re-render. */
export const heroState = {
  scroll: 0, // 0 at the top of the hero, 1 once it has scrolled away
  pointerX: 0, // -1 (left) to 1 (right)
  pointerY: 0, // -1 (top) to 1 (bottom)
};
