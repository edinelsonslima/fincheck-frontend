import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";

import { useLocalStorage } from "../hooks/use-local-storage.hook";
import { useUserMe } from "../hooks/use-user.hook";

import { LaunchScreen } from "../../view/components/page-loader.component";

import { enLocalStorage } from "../../types/enums/local-storage.enum";

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

  const { isSuccess, isFetching, isError, remove } = useUserMe({
    enabled: !!accessToken,
    staleTime: Infinity,
  });

  const signin = useCallback(
    (accessToken: string) => setAccessToken(accessToken),
    [setAccessToken]
  );

  const signout = useCallback(() => {
    removeAccessToken();
    remove();
  }, [remove, removeAccessToken]);

  useEffect(() => {
    if (!isError) return;
    toast.error("Session expired, please login again");
    signout();
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && !!accessToken,
        signin,
        signout,
      }}
    >
      <LaunchScreen loading={isFetching} />
      {!isFetching  && children}
    </AuthContext.Provider>
  );
}
