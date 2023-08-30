import { QueryFunctionContext, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError, OmitQKeyQFn } from ".";

export module IUserMe {
  export interface Response {
    name: string;
    email: string;
  }

  export interface Error extends AxiosError<IApiError> {}

  export interface QueryOptions
    extends OmitQKeyQFn<UseQueryOptions<Response, Error, Response, string[]>> {}

  export interface QueryFnProps extends QueryFunctionContext {}
}
