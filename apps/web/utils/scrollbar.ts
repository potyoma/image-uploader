const HIDE_SCROLLBAR = "hideScrollbar";
const body = document.body;

export function hideScrollbar() {
  body.classList.add(HIDE_SCROLLBAR);
}

export function showScrollbar() {
  body.classList.remove(HIDE_SCROLLBAR);
}
