import { enTransactionType } from "../enums/transaction-type.enum";
import { AxiosError } from "axios";
import { IApiError, IOmitMKeyMFn } from ".";
import { UseMutationOptions } from "@tanstack/react-query";

export module ITransactions {
  export type Types = keyof typeof enTransactionType;

  interface Entity {
    id: string;
    userId: string;
    categoryId: string;
    bankAccountId: string;
    name: string;
    date: string;
    type: Types;
    value: number;
  }

  export module Create {
    export interface Params {
      bankAccountId: string;
      categoryId: string;
      name: string;
      value: number;
      date: string;
      type: Types;
    }

    export interface Response extends Entity {}

    export interface Error extends AxiosError<IApiError, Params> {}

    export interface MutationOptions
      extends IOmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
  }
}
