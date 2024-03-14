import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

interface AutoToggleProps {
  setToggle: Dispatch<SetStateAction<boolean>>;
  tagRef: RefObject<HTMLDivElement | HTMLTextAreaElement | null>;
}

export default function AutoToggle({ setToggle, tagRef }: AutoToggleProps) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (tagRef?.current?.contains(e.target as Node)) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setToggle, tagRef]);
}
