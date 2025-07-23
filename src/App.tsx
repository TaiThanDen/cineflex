import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PopupAd from "@/components/home/PopupAd.tsx";
import BottomBannerAd from "@/components/home/BottomBannerAd.tsx";
import Auth from "./context/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem('auth') || ''
  });

  const [showPopup, setShowPopup] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth.Provider value={authContextValue}>
          <ToastContainer />
          <PopupAd
              open={showPopup}
              onClose={() => setShowPopup(false)}
              image="/img/logo.png"
              link="https://example.com"
          />
          <BottomBannerAd
              image="/img/logo.png"
              link="https://example.com"
          />
          <AppRoutes />
        </Auth.Provider>             
      </QueryClientProvider>

    </Router>
  );
};

export default App;
