import { Swiper, SwiperSlide } from "swiper/react";
import { intlDate, intlMonths, t } from "../../../../../app/i18n";
import { IconChevronDown } from "../../../../../assets/icons/chevron-down.icon";
import { IconFilter } from "../../../../../assets/icons/filter.icon";
import { IconTransactions } from "../../../../../assets/icons/transactions.icon";
import { CategoryIcon } from "../../../../components/category-icon.component";
import { ButtonChevron } from "../button-chevron.component";
import { Value } from "../value.component";
import { ButtonMonth } from "./button-month.component";
import { useController } from "./use-controller.hook";

export function Transactions() {
  const { areValuesVisible } = useController();

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

      <section className="flex-1 mt-4 space-y-2 overflow-y-auto">
        <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <CategoryIcon type="expense" />

            <div>
              <strong className="block font-bold">Almoço</strong>
              <span className="text-sm text-gray-600">
                {intlDate("12/05/2023")}
              </span>
            </div>
          </div>
          <span className="text-red-800 tracking-tighter font-medium">
            - <Value value={656.89} visible={areValuesVisible} blur="sm" />
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <CategoryIcon type="income" />

            <div>
              <strong className="block font-bold">Almoço</strong>
              <span className="text-sm text-gray-600">
                {intlDate("12/05/2023")}
              </span>
            </div>
          </div>
          <span className="text-green-800 tracking-tighter font-medium">
            + <Value value={656.89} visible={areValuesVisible} blur="sm" />
          </span>
        </div>
      </section>
    </>
  );
}
