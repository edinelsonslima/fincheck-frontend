import { enTransactionType } from "../enums/transaction-type.enum";
import { AxiosError } from "axios";
import { IApiError, IOmitMKeyMFn, IOmitQKeyQFn } from ".";
import {
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

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
    category?: {
      id: string;
      name: string;
      icon: string;
    };
  }

  export module GetAll {
    export interface Params {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: Types;
    }

    export interface Response extends Array<Entity> {}

    export interface Error extends AxiosError<IApiError> {}

    export interface QueryOptions
      extends IOmitQKeyQFn<
        UseQueryOptions<Response, Error, Response, string[]>
      > {}

    export interface QueryFnProps extends QueryFunctionContext {}
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
