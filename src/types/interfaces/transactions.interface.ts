import { enTransactionType } from "@enums/transaction-type.enum";
import {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError, IOmitQKeyQFn, IOmitMKeyMFn } from ".";

export module ITransactions {
  export interface Entity {
    id: string;
    userId: string;
    categoryId: string;
    bankAccountId: string;
    name: string;
    date: string;
    type: enTransactionType;
    value: number;
    bankAccount?: {
      color: string;
    };
    category?: {
      id: string;
      name: string;
      icon: string;
    };
  }

  export module Get {
    export interface Params {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: enTransactionType;
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
      type: enTransactionType;
    }

    export interface Response extends Entity {}

    export interface Error extends AxiosError<IApiError, Params> {}

    export interface MutationOptions
      extends IOmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
  }

  export module Update {
    export interface Params {
      id: string;
      bankAccountId: string;
      categoryId: string;
      name: string;
      value: number;
      date: string;
      type: enTransactionType;
    }

    export interface Response extends Entity {}

    export interface Error extends AxiosError<IApiError, Params> {}

    export interface MutationOptions
      extends IOmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
  }

  export module Delete {
    export type Params = string;

    export type Response = void;

    export interface Error extends AxiosError<IApiError, Params> {}

    export interface MutationOptions
      extends IOmitMKeyMFn<UseMutationOptions<unknown, Error, Params>> {}
  }
}
