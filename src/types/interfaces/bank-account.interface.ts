import { AxiosError } from "axios";
import { IApiError, OmitMKeyMFn, OmitQKeyQFn } from ".";
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
}

export module IBankAccountCreate {
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
    extends OmitMKeyMFn<UseMutationOptions<Response, Error, Params>> {}
}

export module IBankAccountGetAll {
  export interface Response extends Array<IBankAccount.Entity> {}

  export interface Error extends AxiosError<IApiError> {}

  export interface QueryOptions
    extends OmitQKeyQFn<UseQueryOptions<Response, Error, Response, string[]>> {}

  export interface QueryFnProps extends QueryFunctionContext {}
}
