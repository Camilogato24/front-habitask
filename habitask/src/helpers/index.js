export const ifError = (mensaje) => {
  if (mensaje == "Login exitoso" || mensaje == "Tarea creada exitosamente") {
    return "success";
  } else {
    return "error";
  }
};
