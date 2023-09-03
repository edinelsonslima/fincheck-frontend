import { useSwiper } from "swiper/react";
import { IconChevronLeft } from "../../../../../assets/icons/chevron-left.icon";
import { IconChevronRight } from "../../../../../assets/icons/chevron-left.right";

interface ButtonChevronProps {
  direction: "slidePrev" | "slideNext";
}

export function ButtonChevron({ direction }: ButtonChevronProps) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper[direction]()}
      className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
    >
      {direction === "slidePrev" && (
        <IconChevronLeft className="text-white w-6 h-6" />
      )}

      {direction === "slideNext" && (
        <IconChevronRight className="text-white w-6 h-6" />
      )}
    </button>
  );
}
