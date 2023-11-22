import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IBankAccountCreate,
  IBankAccountGetAll,
} from "../../types/interfaces/bank-account.interface";
import { bankAccountService } from "../services/bank-account.service";
import { enKeys } from "../../types/enums/requests-keys.enum";

export function useBankAccountCreate(
  mutationOptions?: IBankAccountCreate.MutationOptions
) {
  return useMutation(
    enKeys.bankAccount.create,
    bankAccountService.create,
    mutationOptions
  );
}

export function useBankAccountGetAll(
  options?: IBankAccountGetAll.QueryOptions
) {
  return useQuery(
    enKeys.bankAccount.getAll,
    bankAccountService.getAll,
    options
  );
}
