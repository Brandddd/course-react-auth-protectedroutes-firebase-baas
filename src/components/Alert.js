export function Alert({ messsage }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 text-center">
      <span className="sm:inline block">{messsage}</span>
    </div>
  );
}

// * px y py -> padding, rounded -> redondeado, relative -> estará dentro del contenedor
// * mb-2 -> margin button, text-center -> centrar texto dentro del recuadro
// * sm:inline block -> para poder poner iconos despues del span
