import { enBankAccountType } from "@enums/bank-account-type.enum";
import {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError, IOmitQKeyQFn, IOmitMKeyMFn } from ".";

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

  export module Get {
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
      name: string;
      initialBalance: number;
      color: string;
      type: keyof typeof enBankAccountType;
    }

    export interface Response extends Omit<Entity, "currentBalance"> {}

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

    export interface Response extends Omit<Entity, "currentBalance"> {}

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
