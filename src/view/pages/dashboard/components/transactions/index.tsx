import { Swiper, SwiperSlide } from "swiper/react";

import { intlMonths, t } from "../../../../../app/i18n";

import { ButtonMonth } from "./button-month.component";
import { ButtonChevron } from "../button-chevron.component";

import { IconFilter } from "../../../../../assets/icons/filter.icon";
import { IconChevronDown } from "../../../../../assets/icons/chevron-down.icon";
import { IconTransactions } from "../../../../../assets/icons/transactions.icon";

export function Transactions() {
  return (
    <>
      <header className="space-y-6">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2">
            <IconTransactions />
            <span className="text-sm text-gray-800 tracking-tighter font-medium">
              {t("Transactions")}
            </span>
            <IconChevronDown className="text-gray-900" />
          </button>

          <button>
            <IconFilter />
          </button>
        </div>

        <div className="relative">
          <Swiper slidesPerView={3} centeredSlides>
            <ButtonChevron
              direction="slidePrev"
              className="z-10 absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-800 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-gray-100 to-transparent"
            />

            {intlMonths("short").map((month, index) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <ButtonMonth month={{ month, index }} isActive={isActive} />
                )}
              </SwiperSlide>
            ))}

            <ButtonChevron
              direction="slideNext"
              className="z-10 absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-800 w-12 h-12 flex items-center justify-center bg-gradient-to-l from-gray-100 to-transparent"
            />
          </Swiper>
        </div>
      </header>

      <section className="mt-16">Conteúdo</section>
    </>
  );
}
