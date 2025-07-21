import { BrowserRouter, Router } from "react-router-dom";
import AppRoutes from "../src/Routes/AppRoutes.jsx";
import { AuthProvider } from "./AuthServices/AuthContext";
import { LoadingProvider } from "./Loader/GlobalLoaderContext.jsx";


function App() {

  
  return (
  <LoadingProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </LoadingProvider>
  );

}

export default App;
