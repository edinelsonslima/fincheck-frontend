import { useMutation, useQuery } from "@tanstack/react-query";
import { IBankAccount } from "../../types/interfaces/bank-account.interface";
import { bankAccountService } from "../services/bank-account.service";
import { enKeys } from "../../types/enums/requests-keys.enum";

export function useBankAccountGet(
  options?: IBankAccount.Get.QueryOptions
) {
  return useQuery(
    enKeys.bankAccount.get,
    bankAccountService.get,
    options
  );
}

export function useBankAccountCreate(
  mutationOptions?: IBankAccount.Create.MutationOptions
) {
  return useMutation(
    enKeys.bankAccount.create,
    bankAccountService.create,
    mutationOptions
  );
}

export function useBankAccountUpdate(
  mutationOptions?: IBankAccount.Update.MutationOptions
) {
  return useMutation(
    enKeys.bankAccount.update,
    bankAccountService.update,
    mutationOptions
  );
}

export function useBankAccountDelete(
  mutationOptions?: IBankAccount.Delete.MutationOptions
) {
  return useMutation(
    enKeys.bankAccount.delete,
    bankAccountService.delete,
    mutationOptions
  );
}
