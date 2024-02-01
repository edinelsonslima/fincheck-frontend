import { useMutation, useQuery } from "@tanstack/react-query";
import { enKeys } from "../../types/enums/requests-keys.enum";
import { ITransactions } from "../../types/interfaces/transactions.interface";
import { transactionsService } from "../services/transactions.service";

export function useTransactionsGetAll(
  options?: ITransactions.GetAll.QueryOptions
) {
  return useQuery(
    enKeys.transactions.getAll,
    transactionsService.getAll({ month: 1, year: 2024 }),
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
