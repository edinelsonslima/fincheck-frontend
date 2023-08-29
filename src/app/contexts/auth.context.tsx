import { PropsWithChildren, createContext, useCallback } from "react";
import { enLocalStorage } from "../../types/enums/local-storage.enum";
import { useLocalStorage } from "../hooks/use-local-storage.hook";

interface AuthContextValue {
  signedIn: boolean;
  signout: () => void;
  signin: (accessToken: string) => void;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    enLocalStorage.ACCESS_TOKEN,
    ""
  );

  const signin = useCallback(
    (accessToken: string) => setAccessToken(accessToken),
    [setAccessToken]
  );

  const signout = useCallback(() => removeAccessToken(), [removeAccessToken]);

  return (
    <AuthContext.Provider value={{ signedIn: !!accessToken, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
