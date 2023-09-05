import { useDashboard } from "../../hook/use-dashboard.hook";

export function useController() {
  const { areValuesVisible } = useDashboard();
  return { areValuesVisible };
}
