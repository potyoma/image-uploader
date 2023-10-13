export function plural(word: string, items: number = 1) {
  return items === 1 ? word : `${word}s`;
}
