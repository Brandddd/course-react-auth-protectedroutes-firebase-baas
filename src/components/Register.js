import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom"; //!REDIRIGIR HACIA DIFERENTES PAGINAS
import { Alert } from "./Alert";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth(); //!EXPORTACION DEL OBJETO TIPO SIGNUP
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChanges = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    //?LAS FUNCIONES ASINCRONAS SE IDENTIFICAN CON EL ASYNC Y ES UNA PETICION HACIA UN BACKEND
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password); //? FUNCION ASINCRONA
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/internal-error") {
        setError("Correo inválidado.");
      }
      if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 8 caracteres.");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo ya se encuentra registrado.");
      }
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert messsage={error} />}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-sans mb-2"
            htmlFor="email"
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
            className="block text-gray-700 text-sm font-sans mb-2"
            htmlFor="password"
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

        <button className="bg-slate-800 hover:bg-slate-500 text-white font-sans py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Registrarse</button>
      </form>
    </div>
  );
}
