//SI EL USUARIO NO ESTA LOGEADO, NO PODRA ACCEDER A NINGUNA PAGINA GRACIAS A ESTE COMPONENTE.

import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}) {
    const {user, loading} = useAuth();

    if (loading) return <h1>Cargando...</h1>;

    if (!user) return <Navigate to='/Login' />;

    return <>{children}</>;     //Children es quien lleva el paquete de datos
}