import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Auth from "./context/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem('auth') || ''
  });

  const authContextValue = {auth, setAuth}




  useEffect(() => {
    if (auth.trim() === '') {
      localStorage.removeItem('auth');
    }
    localStorage.setItem('auth', auth);

    queryClient.invalidateQueries({
      queryKey: ["user-subscription"]
    })
  }, [auth]);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth.Provider value={authContextValue}>
          <ToastContainer />

          <AppRoutes />
        </Auth.Provider>             
      </QueryClientProvider>

    </Router>
  );
};

export default App;
