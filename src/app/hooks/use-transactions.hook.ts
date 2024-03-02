import { useMutation, useQuery } from "@tanstack/react-query";
import { enKeys } from "../../types/enums/requests-keys.enum";
import { ITransactions } from "../../types/interfaces/transactions.interface";
import { transactionsService } from "../services/transactions.service";
import { useParameters } from "./use-parameters.hook";

export function useTransactionsGetAll(
  options?: ITransactions.GetAll.QueryOptions
) {
  const [parameters] = useParameters();

  const filters: ITransactions.GetAll.Params = {
    month: parameters.month,
    year: parameters.year,
    type: parameters.type,
    bankAccountId: parameters.bankAccountId,
  };

  return useQuery(
    enKeys.transactions.getAll(filters),
    transactionsService.getAll(filters),
    options
  );
}

export function useTransactionsCreate(
  mutationOptions?: ITransactions.Create.MutationOptions
) {
  return useMutation(
    enKeys.transactions.create,
    transactionsService.create,
    mutationOptions
  );
}

export function useTransactionsUpdate(
  mutationOptions?: ITransactions.Update.MutationOptions
) {
  return useMutation(
    enKeys.transactions.update,
    transactionsService.update,
    mutationOptions
  );
}

export function useTransactionsDelete(
  mutationOptions?: ITransactions.Delete.MutationOptions
) {
  return useMutation(
    enKeys.transactions.delete,
    transactionsService.delete,
    mutationOptions
  );
}
