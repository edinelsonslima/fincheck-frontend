import { QueryKey } from "@tanstack/react-query";

export function formatKeys(variables: object, ...args: QueryKey) {
  return [...args, ...Object.entries(variables).flat()];
}
