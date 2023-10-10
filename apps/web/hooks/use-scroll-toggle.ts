import { hideScrollbar, showScrollbar } from "@web/utils";
import { useEffect } from "react";

export function useScrollToggle(toggle: boolean) {
  useEffect(() => {
    if (toggle) hideScrollbar();
    else showScrollbar();
  }, [toggle]);
}
