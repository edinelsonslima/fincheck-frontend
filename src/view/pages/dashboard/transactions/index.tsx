import { Spinner } from "@animations/spinner.animation";
import { ImageEmptyState } from "@images/empty-state.image";
import { Swiper, SwiperSlide } from "swiper/react";
import { ButtonChevron } from "../button-chevron.component";
import { ButtonMonth } from "./button-month.component";
import { EditTransactionModal } from "./edit-transaction-modal";
import { FilterModal } from "./filter-modal.component";
import { FilterType } from "./filter-type.component";
import { TransactionCard } from "./transaction-card.component";
import { useController } from "./use-controller.hook";

export function Transactions() {
  const {
    transactions,
    isLoading,
    isInitialLoading,
    intlMonths,
    t,
    parameters,
    setParameters,
    handleCloseEditModal,
    handleOpenEditModal,
    isEditModalOpen,
    transactionBeingEdited,
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
          <FilterType />

          <FilterModal />
        </div>

        <div className="relative">
          <Swiper
            slidesPerView={3}
            centeredSlides
            initialSlide={parameters.month}
            onSlideChange={(swiper) => {
              setParameters("month", swiper.realIndex);
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

      <section className="flex-1 mt-4 space-y-2 md:overflow-y-auto pr-1">
        {isLoading && (
          <div className="h-full grid place-items-center">
            <Spinner className="w-10 h-10" />
          </div>
        )}

        {!transactions?.length && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <ImageEmptyState />
            <p className="text-gray-700">
              {t("We didn't find any transactions")}
            </p>
          </div>
        )}

        {!!transactions?.length && !isLoading && (
          <>
            {transactionBeingEdited && (
              <EditTransactionModal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                transaction={transactionBeingEdited}
              />
            )}

            {transactions
              .map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onClick={() => handleOpenEditModal(transaction)}
                />
              ))
              .reverse()}
          </>
        )}
      </section>
    </>
  );
}
