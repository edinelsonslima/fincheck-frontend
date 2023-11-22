import { useQuery } from "@tanstack/react-query";
import { IUserMe } from "../../types/interfaces";
import { userService } from "../services/user.service";
import { enKeys } from "../../types/enums/requests-keys.enum";

export function useUserMe(options?: IUserMe.QueryOptions) {
  return useQuery(enKeys.user.me, userService.me, options);
}
