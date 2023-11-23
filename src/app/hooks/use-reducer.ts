import { useReducer as useReducerReact } from "react";

interface IUpdateState<TStates extends object, TKey extends keyof TStates> {
  action: TKey;
  value: TStates[TKey];
}

export function useReducer<TStates extends object>(initialStates: TStates) {
  const reducer = <TKey extends keyof TStates>(
    prevStates: TStates,
    { action, value }: IUpdateState<TStates, TKey>
  ): TStates => ({ ...prevStates, [action]: value });

  const [states, _dispatch] = useReducerReact(reducer, initialStates);

  const dispatch = <TKey extends keyof TStates>({
    action,
    value,
  }: IUpdateState<TStates, TKey>) => _dispatch({ action, value });

  return [states, dispatch] as const;
}
