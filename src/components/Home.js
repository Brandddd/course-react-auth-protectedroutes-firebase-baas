import { useAuth } from "../context/authContext";

export function Home() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    //* Para saber que es una funcion asincrona es cuando marca Promise encima de la funcion
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h1>Cargando...</h1>;

  return (
    <div>
      <h1 className="text-white">Bienvenido a su sesion {user.displayName || user.email}</h1>

      <button onClick={handleLogout} className="text-white">Cerrar sesión</button>
    </div>
  );
}
