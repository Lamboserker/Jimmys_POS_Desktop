import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import LoadingPage from "../Loading/Loading";

const Login = () => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const loginData = {
        password,
        ...(userInput.includes("@")
          ? { email: userInput }
          : { name: userInput }),
      };

      const response = await axios.post(`${apiUrl}/users/login`, loginData);
      localStorage.setItem("token", response.data.token);

      if (response.data.token) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // Extend the loading time by 2 seconds
      } else {
        setAlert({
          open: true,
          message: "Kein Token erhalten. Login fehlgeschlagen.",
          severity: "error",
        });
        setIsLoading(false); // Set loading state to false if failed
      }
    } catch (error) {
      let errorMessage = "Login fehlgeschlagen.";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Falsches Passwort oder falsche E-Mail.";
        } else if (error.response.status === 404) {
          errorMessage = "Benutzer nicht gefunden.";
        } else {
          errorMessage = error.response.data?.message || "Serverfehler.";
        }
      } else {
        errorMessage = "Netzwerkfehler. Bitte versuchen Sie es später erneut.";
      }
      setAlert({
        open: true,
        message: errorMessage,
        severity: "error",
      });
      setIsLoading(false); // Set loading state to false if failed
    }
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-12 w-auto"
            src="https://static.wixstatic.com/media/46be4a_6c3f161a74e24760a2be8db1349380ee~mv2.png/v1/fill/w_159,h_159,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_startseite-1.png"
            alt="Jimmys mobile Cocktailbar"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Melde dich an
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="userInput"
                className="block text-sm text-start font-medium leading-6 text-white"
              >
                Benutzername oder E-Mail
              </label>
              <div className="mt-2">
                <input
                  id="userInput"
                  name="userInput"
                  type="text"
                  autoComplete="username"
                  required
                  className="bg-white appearance-none block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Passwort
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Passwort vergessen?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-white appearance-none block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Anmelden
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Noch nicht registriert?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Registriere dich hier!
            </Link>
          </p>
        </div>
      </div>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
