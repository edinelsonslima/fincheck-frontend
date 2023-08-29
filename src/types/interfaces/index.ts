import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ComponentProps } from "react";

export interface SVGProps extends Omit<ComponentProps<"svg">, "children"> {}

interface IApiError {
  error: string;
  message: string;
  statusCode: number;
}

export module IAuthSignup {
  export interface Params {
    name: string;
    email: string;
    password: string;
  }

  export interface Response {
    accessToken: string;
  }

  export interface Error extends AxiosError<IApiError, Params> {}

  export interface MutationOptions
    extends UseMutationOptions<Response, Error, Params> {}
}

export module IAuthSignin {
  export interface Params {
    email: string;
    password: string;
  }

  export interface Response {
    accessToken: string;
  }

  export interface Error extends AxiosError<IApiError, Params> {}

  export interface MutationOptions
    extends UseMutationOptions<Response, Error, Params> {}
}
