import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, //*Funcion signOut desde el backend firebase
  GoogleAuthProvider, //*Registro con google desde firebase backend
  signInWithPopup, //*Registro con una ventana tipo PopUp
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useEffect } from "react";
import { useState } from "react";

//* OnAuthStateChanged -> Cambia los estados de conectado a desconectado.

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  //Authprovider va en los compenentes que van acceder a los datos de la pagina.

  const [user, setUser] = useState(null); //*Iniciamente esta en null, porque al iniciar la app, no hay nadie logeado.
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    //*Ejecuta algo apenas carga el componente
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //* Cuando el usuario esta logeado devuelve el objeto usuario, si no, devuelve NULL, lo que verifica que el usuario está logeado.
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{ signup, login, user, logout, loading, loginWithGoogle }}
    >
      {children}
    </authContext.Provider>
  );
  //!CUALQUIER COMPONENTE HIJO VA TENER ACCESO A LO QUE ESTE DENTRO DEL PROVIDER
}

//El metodo que se usa es como la creacionde un pbjeto tipo signUp y se envia como dato a firebase.
