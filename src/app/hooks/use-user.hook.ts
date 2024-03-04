import { enKeys } from "@enums/requests-keys.enum";
import { IUser } from "@interfaces/index";
import { userService } from "@services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useUserMe(options?: IUser.Me.QueryOptions) {
  return useQuery(enKeys.user.me, userService.me, options);
}
