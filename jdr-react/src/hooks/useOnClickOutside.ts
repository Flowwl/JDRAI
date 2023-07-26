/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect } from "react";

export function useOnClickOutside(ref: RefObject<HTMLElement>, onClickOutside: (...args: any[]) => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref && ref.current && event.target && !ref.current.contains(event.target as Node)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);
}
