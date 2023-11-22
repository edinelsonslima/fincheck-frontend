import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { IAuthSignin, IAuthSignup } from "../../types/interfaces";
import { AuthContext } from "../contexts/auth.context";
import { authService } from "../services/auth.service";
import { enKeys } from "../../types/enums/requests-keys.enum";

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthSignup(mutationOptions?: IAuthSignup.MutationOptions) {
  return useMutation(enKeys.auth.signup, authService.signup, mutationOptions);
}

export function useAuthSignin(mutationOptions?: IAuthSignin.MutationOptions) {
  return useMutation(enKeys.auth.signin, authService.signin, mutationOptions);
}

export type { IAuthSignin, IAuthSignup };
