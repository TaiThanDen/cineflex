import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes";
const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
