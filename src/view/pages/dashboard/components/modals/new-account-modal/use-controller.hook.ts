import { z } from "zod";
import { intlService } from "../../../../../../app/services/intl.service";
import { useDashboard } from "../../../hook/use-dashboard.hook";
import { enBankAccountType } from "../../../../../../types/enums/bank-account-type.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccountCreate } from "../../../../../../app/hooks/use-bank-account.hook";
import toast from "react-hot-toast";
import { enKeys } from "../../../../../../types/enums/requests-keys.enum";
import { IBankAccount } from "../../../../../../types/interfaces/bank-account.interface";
import { ITransactions } from "../../../../../../types/interfaces/transactions.interface";
import { useParameters } from "../../../../../../app/hooks/use-parameters.hook";
import { enTransactionType } from "../../../../../../types/enums/transaction-type.enum";
import { useCache } from "../../../../../../app/hooks/use-cache.hook";

const { intlCurrency, intlTerm } = intlService;

const schema = z.object({
  initialBalance: z.number({
    required_error: intlTerm("Initial balance is required"),
  }),
  name: z.string().nonempty(intlTerm("Account name is required")),
  color: z.string().nonempty(intlTerm("Color is required")),
  type: z.enum([
    enBankAccountType.CASH,
    enBankAccountType.CHECKING,
    enBankAccountType.INVESTMENT,
  ]),
});

type IFormData = z.infer<typeof schema>;

export function useController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  const { currencySymbol } = intlCurrency(0);

  const [parameters] = useParameters();
  const [, setCacheBankAccounts] = useCache<IBankAccount.GetAll.Response>(
    enKeys.bankAccount.getAll
  );
  const [getCacheTransactions] = useCache<ITransactions.GetAll.Response>(
    enKeys.transactions.getAll({
      month: parameters.month,
      year: parameters.year,
      type: parameters.type,
      bankAccountId: parameters.bankAccountId,
    })
  );

  const bankAccountCreate = useBankAccountCreate();

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    control,
    reset,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: 0,
      type: enBankAccountType.CHECKING,
      color: "",
      name: "",
    },
  });

  const updateCacheBankAccounts = (
    bankAccount: IBankAccount.Create.Response
  ) => {
    const currentBalance = getCacheTransactions()
      ?.filter(({ bankAccountId }) => bankAccountId === bankAccount.id)
      .reduce((total, { value, type }) => {
        if (type === enTransactionType.INCOME) {
          total += value;
        }

        if (type === enTransactionType.EXPENSE) {
          total -= value;
        }

        return total;
      }, bankAccount.initialBalance);

    setCacheBankAccounts((bankAccounts) =>
      bankAccounts?.concat({
        ...bankAccount,
        currentBalance: currentBalance ?? bankAccount.initialBalance,
      })
    );
  };

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const newBankAccount = await bankAccountCreate.mutateAsync(data);

      reset();
      updateCacheBankAccounts(newBankAccount);
      toast.success(intlTerm("Account registered successfully!"));
      closeNewAccountModal();
    } catch (error) {
      const err = error as IBankAccount.Create.Error;
      toast.error(
        intlTerm(
          err.response?.data.message || "Error while registering the account!"
        )
      );
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    intlTerm,
    currencySymbol,
    register,
    errors,
    handleSubmit,
    control,
    isLoading: bankAccountCreate.isLoading,
  };
}
