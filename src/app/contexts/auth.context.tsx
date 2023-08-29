import { PropsWithChildren, createContext } from "react";

interface AuthContextValue {
  signedIn: boolean;
}

export const AuthContext = createContext<AuthContextValue>({ signedIn: false });

export function AuthProvider({ children }: PropsWithChildren) {
  return (
    <AuthContext.Provider value={{ signedIn: false }}>
      {children}
    </AuthContext.Provider>
  );
}
