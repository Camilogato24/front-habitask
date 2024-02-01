import React, { useEffect } from 'react';
import Menu from "../Menu/index";
import useUserStore from "../../store/store";
import DataTable from '../DataTable/index';
import "./listTasks.css";

const ListTasks = () => {
  const { tareas, obtenerTareas } = useUserStore();
  useEffect(() => {
    const getList = async () => {
      await obtenerTareas();
    };

    getList();
  }, []);
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Título', accessor: 'titulo' },
    { Header: 'Estado', accessor: 'estado', Cell: ({ value }) => (value ? 'Activa' : 'Inactiva') },
    { Header: 'Fecha de Creación', accessor: 'fecha_creacion' },
    { Header: 'Fecha de Completado', accessor: 'fecha_completado' },
    { Header: 'Creador ID', accessor: 'usuario_creador_id' },
    { Header: 'Asignado ID', accessor: 'usuario_asignado_id' },
  ];
  let parsedTasks = [];
  try {
    parsedTasks = tareas && tareas.body ? JSON.parse(tareas.body) : [];
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  return (
    <div>
      <Menu />
      <h2>List tasks</h2>
      {parsedTasks.length > 0 && <DataTable columns={columns} data={parsedTasks} />}
    </div>
  );
};

export default ListTasks;
