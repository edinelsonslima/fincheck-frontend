import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { IAuthSignin, IAuthSignup } from "../../types/interfaces";
import { AuthContext } from "../contexts/auth.context";
import { authService } from "../services/auth.service";

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useAuthSignup(mutationOptions?: IAuthSignup.MutationOptions) {
  return useMutation(["auth", "signup"], authService.signup, mutationOptions);
}

export function useAuthSignin(mutationOptions?: IAuthSignin.MutationOptions) {
  return useMutation(["auth", "signin"], authService.signin, mutationOptions);
}

export type { IAuthSignin, IAuthSignup };
