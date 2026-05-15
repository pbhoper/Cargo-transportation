import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import {AuthProvider} from "./forms/authcontext.tsx";

function App() {
  return (
  <AuthProvider>
   <RouterProvider router={router} />;
  </AuthProvider>
  )
}

export default App;