import { useMutation } from "@tanstack/react-query";
import { enKeys } from "../../types/enums/requests-keys.enum";
import { ITransactions } from "../../types/interfaces/transactions.interface";
import { transactionsService } from "../services/transactions.service";

export function useTransactionsCreate(
  mutationOptions?: ITransactions.Create.MutationOptions
) {
  return useMutation(
    enKeys.transactions.create,
    transactionsService.create,
    mutationOptions
  );
}
