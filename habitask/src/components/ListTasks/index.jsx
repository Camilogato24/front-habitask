import React, { useEffect } from 'react';
import Menu from "../Menu/index";
import useUserStore from "../../store/store";
import DataTable from '../DataTable/index';


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
    { Header: 'Estado', accessor: 'estado' },
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
