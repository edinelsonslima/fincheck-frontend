import { enKeys } from "@enums/requests-keys.enum";
import { enTransactionType } from "@enums/transaction-type.enum";
import { IBankAccount } from "@interfaces/bank-account.interface";
import { ITransactions } from "@interfaces/transactions.interface";
import { bankAccountService } from "@services/bank-account.service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCache } from "./use-cache.hook";
import { useParameters } from "./use-parameters.hook";

export function useBankAccountGet(options?: IBankAccount.Get.QueryOptions) {
  return useQuery(enKeys.bankAccount.get, bankAccountService.get, options);
}

export function useBankAccountCreate(
  mutationOptions?: IBankAccount.Create.MutationOptions
) {
  const [parameters] = useParameters();
  const [, setCacheBankAccounts] = useCache<IBankAccount.Get.Response>(
    enKeys.bankAccount.get
  );
  const [getCacheTransactions] = useCache<ITransactions.Get.Response>(
    enKeys.transactions.get({
      month: parameters.month,
      year: parameters.year,
      type: parameters.type,
      bankAccountId: parameters.bankAccountId,
    })
  );

  const updateCacheBankAccounts = (data: IBankAccount.Create.Response) => {
    const currentBalance = getCacheTransactions()
      ?.filter(({ bankAccountId }) => bankAccountId === data.id)
      .reduce((total, { value, type }) => {
        if (type === enTransactionType.INCOME) {
          total += value;
        }

        if (type === enTransactionType.EXPENSE) {
          total -= value;
        }

        return total;
      }, data.initialBalance);

    setCacheBankAccounts((bankAccounts) =>
      bankAccounts?.concat({
        ...data,
        currentBalance: currentBalance ?? data.initialBalance,
      })
    );
  };

  return useMutation(enKeys.bankAccount.create, bankAccountService.create, {
    ...mutationOptions,
    onSuccess: updateCacheBankAccounts,
  });
}

export function useBankAccountUpdate(
  mutationOptions?: IBankAccount.Update.MutationOptions
) {
  const [parameters] = useParameters();
  const [, setCacheBankAccounts] = useCache<IBankAccount.Get.Response>(
    enKeys.bankAccount.get
  );
  const [getCacheTransactions] = useCache<ITransactions.Get.Response>(
    enKeys.transactions.get({
      month: parameters.month,
      year: parameters.year,
      type: parameters.type,
      bankAccountId: parameters.bankAccountId,
    })
  );

  const updateCacheBankAccountsUpdated = (
    data: IBankAccount.Update.Response,
    variables: IBankAccount.Update.Params
  ) => {
    setCacheBankAccounts((bankAccounts) => {
      if (!bankAccounts) {
        return bankAccounts;
      }

      const bankAccountIndex = bankAccounts.findIndex(({ id }) => {
        return id === variables?.id;
      });

      if (bankAccountIndex === -1) {
        return bankAccounts;
      }

      const currentBalance = getCacheTransactions()
        ?.filter(({ bankAccountId }) => bankAccountId === data.id)
        .reduce((total, { value, type }) => {
          if (type === enTransactionType.INCOME) {
            total += value;
          }

          if (type === enTransactionType.EXPENSE) {
            total -= value;
          }

          return total;
        }, data.initialBalance);

      bankAccounts[bankAccountIndex] = {
        ...bankAccounts[bankAccountIndex],
        ...data,
        currentBalance: currentBalance ?? data.initialBalance,
      };

      return bankAccounts;
    });
  };

  return useMutation(enKeys.bankAccount.update, bankAccountService.update, {
    ...mutationOptions,
    onSuccess: updateCacheBankAccountsUpdated,
  });
}

export function useBankAccountDelete(
  mutationOptions?: IBankAccount.Delete.MutationOptions
) {
  const [parameters] = useParameters();
  const [, setCacheBankAccounts] = useCache<IBankAccount.Get.Response>(
    enKeys.bankAccount.get
  );
  const [, setCacheTransactions] = useCache<ITransactions.Get.Response>(
    enKeys.transactions.get({
      month: parameters.month,
      year: parameters.year,
      type: parameters.type,
      bankAccountId: parameters.bankAccountId,
    })
  );

  const updateCacheBankAccountsDeleted = (
    _: IBankAccount.Delete.Response,
    variables: IBankAccount.Delete.Params
  ) => {
    setCacheTransactions((transactions) =>
      transactions?.filter(({ bankAccountId }) => bankAccountId !== variables)
    );

    setCacheBankAccounts((bankAccounts) =>
      bankAccounts?.filter(({ id }) => id !== variables)
    );
  };

  return useMutation(enKeys.bankAccount.delete, bankAccountService.delete, {
    ...mutationOptions,
    onSuccess: updateCacheBankAccountsDeleted,
  });
}
