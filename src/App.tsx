import { ToastProvider } from "./components";
import AppRouter from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

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
