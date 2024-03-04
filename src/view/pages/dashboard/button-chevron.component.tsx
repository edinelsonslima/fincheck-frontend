import { IconChevronLeft } from "@icons/chevron-left.icon";
import { IconChevronRight } from "@icons/chevron-right.icon";
import { IButtonProps } from "@interfaces/component-props.interface";
import { useSwiper } from "swiper/react";

interface IButtonChevronProps extends IButtonProps {
  direction: "slidePrev" | "slideNext";
}

export function ButtonChevron({ direction, ...props }: IButtonChevronProps) {
  const swiper = useSwiper();

  return (
    <button {...props} onClick={() => swiper[direction]()}>
      {direction === "slidePrev" && <IconChevronLeft className="w-6 h-6" />}

      {direction === "slideNext" && <IconChevronRight className="w-6 h-6" />}
    </button>
  );
}
