import { AxiosError } from "axios";
import { IApiError, IOmitQKeyQFn } from ".";
import { QueryFunctionContext, UseQueryOptions } from "@tanstack/react-query";
import { enTransactionType } from "../enums/transaction-type.enum";

export module ICategories {
  interface Entity {
    id: string;
    userId: string;
    name: string;
    icon: string;
    type: enTransactionType;
  }

  export module GetAll {
    export interface Response extends Array<Entity> {}

    export interface Error extends AxiosError<IApiError> {}

    export interface QueryOptions
      extends IOmitQKeyQFn<
        UseQueryOptions<Response, Error, Response, string[]>
      > {}

    export interface QueryFnProps extends QueryFunctionContext {}
  }
}
