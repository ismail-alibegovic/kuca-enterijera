/**
 * Returns the word spans rendered by <Split> inside an element. The split itself happens on the server,
 * so the DOM never changes under React. Elements without words (e.g. headings with links) animate whole.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const words = Array.from(el.querySelectorAll<HTMLElement>(".split-visual .wi"));
  return words.length ? words : [el];
}
