import { AxiosError } from "axios";
import { IApiError, IOmitQKeyQFn } from ".";
import { QueryFunctionContext, UseQueryOptions } from "@tanstack/react-query";
import { ITransactions } from "./transactions.interface";

export module ICategories {
  export interface Entity {
    id: string;
    userId: string;
    name: string;
    icon: string;
    type: ITransactions.Types;
  }

  export module GetAll {
    export interface Response extends Array<ICategories.Entity> {}

    export interface Error extends AxiosError<IApiError> {}

    export interface QueryOptions
      extends IOmitQKeyQFn<
        UseQueryOptions<Response, Error, Response, string[]>
      > {}

    export interface QueryFnProps extends QueryFunctionContext {}
  }
}
