import { QueryFunctionContext, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError, IOmitQKeyQFn } from ".";

export module IUser {
  export module Me {
    export interface Response {
      name: string;
      email: string;
    }

    export interface Error extends AxiosError<IApiError> {}

    export interface QueryOptions
      extends IOmitQKeyQFn<
        UseQueryOptions<Response, Error, Response, string[]>
      > {}

    export interface QueryFnProps extends QueryFunctionContext {}
  }
}
