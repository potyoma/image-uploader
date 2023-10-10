const HIDE_SCROLLBAR = "hideScrollbar";

export function hideScrollbar() {
  document?.body?.classList.add(HIDE_SCROLLBAR);
}

export function showScrollbar() {
  document?.body?.classList.remove(HIDE_SCROLLBAR);
}
