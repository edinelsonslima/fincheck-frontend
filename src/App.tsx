import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/auth.context";
import { LanguageProvider } from "./app/contexts/language.context";
import { Router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 1000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Toaster />

      <LanguageProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
