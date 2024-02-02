import React, { useState } from "react";
import "./card.css";
import useUserStore from "../../store/store";
import { Toaster, toast } from "sonner";

const Card = ({ id, titulo, estado, fechaCreacion, fechaCompletado }) => {
  const userIDValue = sessionStorage.getItem("userID");
  const { finalizarTarea, mensaje } = useUserStore();

  const [isChecked, setIsChecked] = useState(estado);
  const toastFunc = () => {
    toast("Funcionalidad próximamente.");
  };
  const handleCheckboxChange = async () => {
    if (userIDValue != id) {
      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(), 500)
        );

      toast.promise(promise, {
        loading: "Loading...",
        success: (data) => {
          return `Error al finalizar la tarea, no eres el usuario asignado.`;
        },
        error: "Error",
      });
      return;
    }
    try {
      console.log(userIDValue);
      // const tareaFinalizada = await finalizarTarea(userIDValue, id);

      // Solo si finalizarTarea se ejecuta correctamente, actualizamos el estado y mostramos el toast
      setIsChecked(!isChecked);
      toast.success(mensaje);
    } catch (error) {
      console.error("Error al finalizar la tarea:", error);
      // Puedes manejar el error según tus necesidades, por ejemplo, mostrando un toast de error.
      toast.error("Error al finalizar la tarea");
    }
  };

  return (
    <div className="card" key={id}>
      <Toaster position="top-center" />
      <div className="card-content">
        <h3 className="card-title">{titulo}</h3>
        <div className="estado">
          <label htmlFor="estadoInput">
            <strong>Estado: </strong>
          </label>
          <span>{isChecked ? "Finalizada" : "Activa"}</span>
          <input
            name="estadoInput"
            type="checkbox"
            disabled={isChecked}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <p className="card-description">
          <strong>Fecha creación:</strong> {fechaCreacion}
        </p>
        <p className="card-description">
          <strong>Fecha completado:</strong> {fechaCompletado}
        </p>
        <div className="card-button">
          <button onClick={toastFunc}>Editar</button>
          <button onClick={toastFunc}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
