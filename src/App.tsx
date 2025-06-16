import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes";
import { useState } from "react";

import Auth from "./context/Auth";

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem('theme') ?? '');
  const authContextValue = {auth, setAuth}

  return (
    <Router>
      <Auth.Provider value={authContextValue}>
        <AppRoutes />
      </Auth.Provider>
    </Router>
  );
};

export default App;
