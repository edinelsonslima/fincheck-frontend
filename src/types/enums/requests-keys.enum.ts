export const enKeys = Object.freeze({
  auth: Object.freeze({
    signin: ["auth", "signin"],
    signup: ["auth", "signup"],
  }),
  user: Object.freeze({
    me: ["user", "me"],
  }),
  bankAccount: Object.freeze({
    create: ["bank", "account", "create"],
    update: ["bank", "account", "update"],
    getAll: ["bank", "account", "get", "all"],
  }),
});
