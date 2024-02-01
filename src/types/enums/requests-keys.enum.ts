import { ITransactions } from "../interfaces/transactions.interface";
import { formatKeys } from "../../app/utils/format-query-keys.utils";

export const enKeys = Object.freeze({
  auth: Object.freeze({
    signin: ["auth", "signin"],
    signup: ["auth", "signup"],
  }),
  user: Object.freeze({
    me: ["user", "me"],
  }),
  bankAccount: Object.freeze({
    getAll: ["bank", "account", "get_all"],
    create: ["bank", "account", "create"],
    update: ["bank", "account", "update"],
    delete: ["bank", "account", "delete"],
  }),
  categories: Object.freeze({
    getAll: ["categories", "get_all"],
  }),
  transactions: Object.freeze({
    getAll: (params: ITransactions.GetAll.Params) =>
      formatKeys(params, "transactions", "get_all"),
    create: ["transactions", "create"],
  }),
});
