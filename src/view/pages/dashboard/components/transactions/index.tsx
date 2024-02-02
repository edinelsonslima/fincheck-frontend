import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "../../../../../assets/animations/spinner.animation";
import { ImageEmptyState } from "../../../../../assets/images/empty-state.image";
import { CategoryIcon } from "../../../../components/category-icon.component";
import { ButtonChevron } from "../button-chevron.component";
import { Value } from "../value.component";
import { ButtonMonth } from "./button-month.component";
import { FilterModal } from "./filter-modal.component";
import { FilterType } from "./filter-type.component";
import { useController } from "./use-controller.hook";
import { cn } from "../../../../../app/utils/cn.utils";

export function Transactions() {
  const {
    transactions,
    isLoading,
    isInitialLoading,
    areValuesVisible,
    intlDate,
    intlMonths,
    intlTerm,
    getFilter,
    handleChangeFilter,
  } = useController();

  if (isInitialLoading) {
    return (
      <div className="h-full grid place-items-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  return (
    <>
      <header className="space-y-6">
        <div className="flex items-center justify-between">
          <FilterType onSelect={(value) => handleChangeFilter("type", value)} />

          <FilterModal
            onChange={({ year, bankAccountId }) => {
              handleChangeFilter("year", year);
              handleChangeFilter("bankAccountId", bankAccountId);
            }}
          />
        </div>

        <div className="relative">
          <Swiper
            slidesPerView={3}
            centeredSlides
            initialSlide={getFilter("month")}
            onSlideChange={(swiper) => {
              handleChangeFilter("month", swiper.realIndex);
            }}
          >
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
        {isLoading && (
          <div className="h-full grid place-items-center">
            <Spinner className="w-10 h-10" />
          </div>
        )}

        {!transactions?.length && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <ImageEmptyState />
            <p className="text-gray-700">
              {intlTerm("We didn't find any transactions")}
            </p>
          </div>
        )}

        {!!transactions?.length &&
          !isLoading &&
          transactions
            .map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex flex-1 items-center gap-2">
                  <CategoryIcon
                    type={transaction.type}
                    category={transaction.category?.icon}
                  />

                  <div>
                    <strong className="block font-bold">
                      {transaction.name}
                    </strong>
                    <span className="text-sm text-gray-600">
                      {intlDate(new Date(transaction.date))}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "tracking-tighter font-medium",
                    transaction.type === "EXPENSE" && "text-red-800",
                    transaction.type === "INCOME" && "text-green-800"
                  )}
                >
                  {transaction.type === "EXPENSE" ? "- " : "+ "}
                  <Value
                    value={transaction.value}
                    visible={areValuesVisible}
                    blur="sm"
                  />
                </span>
              </div>
            ))
            .reverse()}
      </section>
    </>
  );
}
