import { useEffect } from "react";

export default function useParallax(ref, intensity = 8) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const offset = window.scrollY * (intensity / 100); 
      element.style.backgroundPositionY = `${offset}px`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, intensity]);
}
