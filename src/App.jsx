import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; 
import LoadingPage from "./Loading/Loading";

// Lazy load the components
const Login = lazy(() => import("./Auth/login"));
const Register = lazy(() => import("./Auth/register"));
const Dashboard = lazy(() => import("./components/Dashboard"));

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00204a",
    },
    secondary: {
      main: "#00204a",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Konsistente Basisstile */}
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
