import { useQuery } from "@tanstack/react-query";
import { IUserMe } from "../../types/interfaces";
import { userService } from "../services/user.service";

export function useUserMe(options?: IUserMe.QueryOptions) {
  return useQuery(["user", "me"], userService.me, options);
}
