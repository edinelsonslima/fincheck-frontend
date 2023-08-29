import { PropsWithChildren, createContext } from "react";

interface AuthContextValue {
  signed: boolean;
}

export const AuthContext = createContext<AuthContextValue>({ signed: false });

export function AuthProvider({ children }: PropsWithChildren) {
  return (
    <AuthContext.Provider value={{ signed: false }}>
      {children}
    </AuthContext.Provider>
  );
}
