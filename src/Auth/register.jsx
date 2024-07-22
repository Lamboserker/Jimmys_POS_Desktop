import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState(""); // Für den Benutzernamen
  const [email, setEmail] = useState(""); // Für die E-Mail-Adresse
  const [password, setPassword] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const registerData = {
        name: username, // Benutzername
        email, // E-Mail-Adresse
        password,
      };

      const response = await axios.post(
        `${apiUrl}/users/register`,
        registerData
      );

      // Token im LocalStorage speichern
      localStorage.setItem("token", response.data.token);

      // Erfolgreiche Registrierung bestätigen
      console.log("Registrierung erfolgreich:", response.data);

      navigate("/login"); // Hier leitest du den Benutzer zur Anmeldeseite um
    } catch (error) {
      console.error(
        "Registrierung fehlgeschlagen:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://static.wixstatic.com/media/46be4a_6c3f161a74e24760a2be8db1349380ee~mv2.png/v1/fill/w_159,h_159,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_startseite-1.png"
            alt="Jimmys mobile Cocktailbar"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Registrieren
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Benutzername
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="bg-white appearance-none block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                E-Mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" bg-white appearance-none block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Passwort
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className=" bg-white appearance-none block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Registrieren
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Bereits registriert?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Logge dich hier ein!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
