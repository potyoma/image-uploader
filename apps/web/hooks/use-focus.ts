import { useEffect, useRef } from "react";

export function useFocus<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return ref;
}
