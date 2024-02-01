import { useMutation, useQuery } from "@tanstack/react-query";
import { enKeys } from "../../types/enums/requests-keys.enum";
import { ITransactions } from "../../types/interfaces/transactions.interface";
import { transactionsService } from "../services/transactions.service";

export function useTransactionsGetAll(
  filters: ITransactions.GetAll.Params,
  options?: ITransactions.GetAll.QueryOptions
) {
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
