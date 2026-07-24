import {
  AuthProvider,
  useAuth,
} from "./forms/authcontext";
import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";

function InnerApp() {
  const auth = useAuth();

  return (
    <RouterProvider
      router={router}
      context={{ auth }}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

export default App;