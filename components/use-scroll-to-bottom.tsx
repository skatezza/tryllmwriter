import { useEffect, useRef } from "react";

export function useScrollToBottom<T extends HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bottomElement = bottomRef.current;

    if (bottomElement && container) {
      const scroll = () => {
        bottomElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      };

      // Add small delay to ensure content is rendered
      const timeoutId = setTimeout(scroll, 100);
      return () => clearTimeout(timeoutId);
    }
  }); // Run effect on every render to ensure smooth scrolling during streaming

  return [containerRef, bottomRef] as const;
}
