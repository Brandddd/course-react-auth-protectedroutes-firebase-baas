import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom"; //!REDIRIGIR HACIA DIFERENTES PAGINAS
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth(); //!EXPORTACION DEL OBJETO TIPO SIGNUP
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChanges = ({ target: { name, value } }) => {
    //CAMBIAR O ACTUALIZAR EL ESTADO
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    //?LAS FUNCIONES ASINCRONAS SE IDENTIFICAN CON EL ASYNC Y ES UNA PETICION HACIA UN BACKEND
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password); //? FUNCION ASINCRONA
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError(error.message);
      if (error.code === "auth/user-not-found") {
        setError("Usuario no registrado.");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      }
    }
  };

  const HandleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert messsage={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-sans mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@company.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline_none focus:shadow-outline"
            onChange={handleChanges}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-sans mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline_none focus:shadow-outline"
            onChange={handleChanges}
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-slate-800 hover:bg-slate-500 text-white font-sans py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">
            Ingresar
          </button>

          <a
            href="#!"
            className="inline-block align-baseline font-sans text-sm text-blue-500 hover:text-blue-800"
          >
            ¿Olvidaste tu contraseña? 
          </a>
        </div>
      </form> 

      <p className="my-4 text-sm flex justify-between px-3 text-white">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="hover:text-blue-500">
          Registrarse
        </Link>
      </p>

      <button
        onClick={HandleGoogleSignIn}
        className="bg-slate-50 hover:bg-slate-200 text-black font-sans shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
      >
        Continuar con Google
      </button>
    </div>
  );
}

// * text-sm -> Texto pequeño, font-bold -> fuente, w-full -> abarcar ancho máximo,
// TODO : RESET PASSWORD (Boton creado, falta 1:57:00)
