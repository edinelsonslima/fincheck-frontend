import { ITransactions } from "@interfaces/transactions.interface";
import { formatKeys } from "@utils/format-query-keys.utils";

export const enKeys = Object.freeze({
  auth: Object.freeze({
    signin: ["auth", "signin"],
    signup: ["auth", "signup"],
  }),
  user: Object.freeze({
    me: ["user", "me"],
  }),
  bankAccount: Object.freeze({
    get: ["bank", "account", "get"],
    create: ["bank", "account", "create"],
    update: ["bank", "account", "update"],
    delete: ["bank", "account", "delete"],
  }),
  categories: Object.freeze({
    get: ["categories", "get"],
  }),
  transactions: Object.freeze({
    get: (params: ITransactions.Get.Params) =>
      formatKeys(params, "transactions", "get"),
    create: ["transactions", "create"],
    update: ["transactions", "update"],
    delete: ["transactions", "delete"],
  }),
});
