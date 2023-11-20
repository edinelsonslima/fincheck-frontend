import { useSwiper } from "swiper/react";
import { IconChevronLeft } from "../../../../assets/icons/chevron-left.icon";
import { IconChevronRight } from "../../../../assets/icons/chevron-right.icon";
import { ButtonProps } from "../../../../types/interfaces";

interface ButtonChevronProps extends ButtonProps {
  direction: "slidePrev" | "slideNext";
}

export function ButtonChevron({ direction, ...props }: ButtonChevronProps) {
  const swiper = useSwiper();

  return (
    <button {...props} onClick={() => swiper[direction]()}>
      {direction === "slidePrev" && <IconChevronLeft className="w-6 h-6" />}

      {direction === "slideNext" && <IconChevronRight className="w-6 h-6" />}
    </button>
  );
}
