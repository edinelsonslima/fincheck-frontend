import { useMutation, useQuery } from "@tanstack/react-query";
import { enKeys } from "../../types/enums/requests-keys.enum";
import { ITransactions } from "../../types/interfaces/transactions.interface";
import { transactionsService } from "../services/transactions.service";
import { useParameters } from "./use-parameters.hook";
import { enTransactionType } from "../../types/enums/transaction-type.enum";
import { useCache } from "./use-cache.hook";
import { IBankAccount } from "../../types/interfaces/bank-account.interface";

export function useTransactionsGet(options?: ITransactions.Get.QueryOptions) {
  const [parameters] = useParameters();

  const filters: ITransactions.Get.Params = {
    month: parameters.month,
    year: parameters.year,
    type: parameters.type,
    bankAccountId: parameters.bankAccountId,
  };

  return useQuery(
    enKeys.transactions.get(filters),
    transactionsService.get(filters),
    options
  );
}

export function useTransactionsCreate(
  mutationOptions?: ITransactions.Create.MutationOptions
) {
  const [parameters] = useParameters();
  const [getBankAccounts, setCacheBankAccounts] =
    useCache<IBankAccount.Get.Response>(enKeys.bankAccount.get);
  const [, setCacheTransactions] = useCache<ITransactions.Get.Response>(
    enKeys.transactions.get({
      month: parameters.month,
      year: parameters.year,
      type: parameters.type,
      bankAccountId: parameters.bankAccountId,
    })
  );

  const updateCacheTransactions = (data: ITransactions.Create.Response) => {
    const bankAccount = getBankAccounts()?.find(({ id }) => {
      return data.bankAccountId === id;
    });

    setCacheTransactions((transactions) => {
      return transactions?.concat({
        ...data,
        ...(bankAccount && { bankAccount: { color: bankAccount?.color } }),
      });
    });

    setCacheBankAccounts((bankAccounts) => {
      if (!bankAccounts) {
        return bankAccounts;
      }

      const matchedBankAccountIndex = bankAccounts?.findIndex(({ id }) => {
        return data.bankAccountId === id;
      });

      if (matchedBankAccountIndex === -1) {
        return bankAccounts;
      }

      const editedBankAccount = bankAccounts[matchedBankAccountIndex];

      if (data.type === enTransactionType.EXPENSE) {
        editedBankAccount.currentBalance -= data.value;
      }

      if (data.type === enTransactionType.INCOME) {
        editedBankAccount.currentBalance += data.value;
      }

      bankAccounts[matchedBankAccountIndex] = editedBankAccount;

      return bankAccounts;
    });
  };

  return useMutation(enKeys.transactions.create, transactionsService.create, {
    ...mutationOptions,
    onSuccess: updateCacheTransactions,
  });
}

export function useTransactionsUpdate(
  mutationOptions?: ITransactions.Update.MutationOptions
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

  const updateCacheTransactions = (
    data: ITransactions.Update.Response,
    variables: ITransactions.Update.Params
  ) => {
    setCacheTransactions((transactions) => {
      if (!transactions) {
        return transactions;
      }

      const transactionIndex = transactions.findIndex(({ id }) => {
        return id === variables.id;
      });

      if (transactionIndex === -1) {
        return transactions;
      }

      transactions[transactionIndex] = {
        ...transactions[transactionIndex],
        ...data,
      };

      return transactions;
    });

    setCacheBankAccounts((bankAccounts) => {
      if (!bankAccounts) {
        return bankAccounts;
      }

      const bankAccountIndex = bankAccounts.findIndex(({ id }) => {
        return data.bankAccountId === id;
      });

      if (bankAccountIndex === -1) {
        return bankAccounts;
      }

      const { initialBalance, ...bankAccount } = bankAccounts[bankAccountIndex];

      if (data.type === enTransactionType.INCOME) {
        bankAccount.currentBalance = initialBalance + data.value;
      }

      if (data.type === enTransactionType.EXPENSE) {
        bankAccount.currentBalance = initialBalance - data.value;
      }

      bankAccounts[bankAccountIndex] = { ...bankAccount, initialBalance };

      return bankAccounts;
    });
  };

  return useMutation(enKeys.transactions.update, transactionsService.update, {
    ...mutationOptions,
    onSuccess: updateCacheTransactions,
  });
}

export function useTransactionsDelete(
  mutationOptions?: ITransactions.Delete.MutationOptions
) {
  const [parameters] = useParameters();
  const [, setCacheBankAccounts] = useCache<IBankAccount.Get.Response>(
    enKeys.bankAccount.get
  );
  const [getCacheTransactions, setCacheTransactions] =
    useCache<ITransactions.Get.Response>(
      enKeys.transactions.get({
        month: parameters.month,
        year: parameters.year,
        type: parameters.type,
        bankAccountId: parameters.bankAccountId,
      })
    );

  const updateCacheTransactions = (
    _: ITransactions.Delete.Response,
    variable: ITransactions.Delete.Params
  ) => {
    const transaction = getCacheTransactions()?.find(({ id }) => {
      return variable === id;
    });

    setCacheTransactions((transactions) => {
      return transactions?.filter(({ id }) => variable !== id);
    });

    setCacheBankAccounts((bankAccounts) => {
      if (!bankAccounts) {
        return bankAccounts;
      }

      const bankAccountIndex = bankAccounts.findIndex(({ id }) => {
        return transaction?.bankAccountId === id;
      });

      if (bankAccountIndex === -1) {
        return bankAccounts;
      }

      const { initialBalance, ...bankAccount } = bankAccounts[bankAccountIndex];

      if (transaction?.type === enTransactionType.INCOME) {
        bankAccount.currentBalance -= transaction.value;
      }

      if (transaction?.type === enTransactionType.EXPENSE) {
        bankAccount.currentBalance += transaction.value;
      }

      bankAccounts[bankAccountIndex] = { ...bankAccount, initialBalance };

      return bankAccounts;
    });
  };

  return useMutation(enKeys.transactions.delete, transactionsService.delete, {
    ...mutationOptions,
    onSuccess: updateCacheTransactions,
  });
}
