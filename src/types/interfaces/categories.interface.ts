import { enTransactionType } from "@enums/transaction-type.enum";
import { UseQueryOptions, QueryFunctionContext } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError, IOmitQKeyQFn } from ".";

export module ICategories {
  interface Entity {
    id: string;
    userId: string;
    name: string;
    icon: string;
    type: enTransactionType;
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
}
