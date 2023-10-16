import { useCallback, useEffect } from "react";

export function useKey(key: string, onPress?: () => void) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        event.preventDefault();
        onPress?.();
      }
    },
    [onPress, key]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
