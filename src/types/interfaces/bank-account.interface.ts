import { AxiosError } from "axios";
import { IApiError, IOmitMKeyMFn, IOmitQKeyQFn } from ".";
import {
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { enBankAccountType } from "../enums/bank-account-type.enum";

export module IBankAccount {
  export interface Entity {
    color: string;
    id: string;
    initialBalance: number;
    name: string;
    type: keyof typeof enBankAccountType;
    userId: string;
    currentBalance: number;
  }

  export module GetAll {
    export interface Response extends Array<IBankAccount.Entity> {}

    export interface Error extends AxiosError<IApiError> {}

    export interface QueryOptions
      extends IOmitQKeyQFn<
        UseQueryOptions<Response, Error, Response, string[]>
      > {}

    export interface QueryFnProps extends QueryFunctionContext {}
  }

  export module Create {
    export interface Params {
      name: string;
      initialBalance: number;
      color: string;
      type: keyof typeof enBankAccountType;
    }

    export interface Response {
      color: string;
      id: string;
      initialBalance: number;
      name: string;
      type: keyof typeof enBankAccountType;
      userId: string;
    }

    export interface Error extends AxiosError<IApiError, Params> {}

    export interface MutationOptions
      extends IOmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
  }

  export module Update {
    export interface Params {
      id: string;
      name: string;
      initialBalance: number;
      color: string;
      type: keyof typeof enBankAccountType;
    }

    export interface Response {
      color: string;
      id: string;
      initialBalance: number;
      name: string;
      type: keyof typeof enBankAccountType;
      userId: string;
    }

    export interface Error extends AxiosError<IApiError, Params> {}

    export interface MutationOptions
      extends IOmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
  }

  export module Delete {
    export type Params = string;

    export interface Error extends AxiosError<IApiError, Params> {}

    export interface MutationOptions
      extends IOmitMKeyMFn<UseMutationOptions<unknown, Error, Params>> {}
  }
}
