export const enKeys = Object.freeze({
  auth: Object.freeze({
    signin: ["auth", "signin"],
    signup: ["auth", "signup"],
  }),
  user: Object.freeze({
    me: ["user", "me"],
  }),
  bankAccount: Object.freeze({
    getAll: ["bank", "account", "get", "all"],
    create: ["bank", "account", "create"],
    update: ["bank", "account", "update"],
    delete: ["bank", "account", "delete"],
  }),
});
