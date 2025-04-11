import { ToastProvider } from "./components";
import AppRouter from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTokenRefresher } from "./services";

function App() {
  const queryClient = new QueryClient();

  useTokenRefresher()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
