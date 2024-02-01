import { create } from "zustand";
const URL_ENDPOINT =
  "https://6l5cukrr5f.execute-api.us-east-1.amazonaws.com/stage";
const useUserStore = create((set) => ({
  nombre: "",
  email: "",
  contrasena: "",
  mensaje: "",
  setNombre: (nombre) => set({ nombre }),
  setEmail: (email) => set({ email }),
  setContrasena: (contrasena) => set({ contrasena }),
  setMensaje: (mensaje) => set({ mensaje }),
  resetForm: () => set({ nombre: "", email: "", contrasena: "", mensaje: "" }),
  registerUser: async () => {
    try {
      const response = await fetch(URL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: useUserStore.getState().nombre,
          email: useUserStore.getState().email,
          contrasena: useUserStore.getState().contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const responseParse = JSON.parse(data.body);
        const mensaje = responseParse.mensaje;
        useUserStore.getState().setMensaje(mensaje);
        sessionStorage.setItem("token", true);
        // Puedes hacer otras acciones después de un registro exitoso
      } else {
        useUserStore.getState().setMensaje(data.error);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      useUserStore.getState().setMensaje("Error interno del servidor");
    }
  },
  loginUser: async () => {
    try {
      const login = "/login";
      const response = await fetch(URL_ENDPOINT + login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: useUserStore.getState().email,
          contrasena: useUserStore.getState().contrasena,
        }),
      });

      const data = await response.json();
      console.log(response, "response");
      if (response.ok) {
        const responseParse = JSON.parse(data.body);
        console.log(responseParse, "responseParse");
        const mensaje = responseParse.mensaje;
        useUserStore.getState().setMensaje(mensaje);
        sessionStorage.setItem("token", true);
        sessionStorage.setItem("userID", responseParse.idUsuario);
        window.location.href = "/list-tasks";
        // Puedes hacer otras acciones después de un inicio de sesión exitoso
      } else {
        useUserStore.getState().setMensaje(data.error);
      }
    } catch (error) {
      console.error("Error al realizar la petición de login:", error);
      useUserStore.getState().setMensaje("Error interno del servidor");
    }
  },
  logout: () => {
    // Elimina el token de sessionStorage
    sessionStorage.removeItem("token");

    // Puedes realizar otras acciones relacionadas con el cierre de sesión, como redirigir a la página de inicio, etc.
    // Ejemplo de redirección a la página de inicio
    window.location.href = "/";
  },
  tareas: [], // Aquí almacenaremos las tareas obtenidas
  setTareas: (tareas) => set({ tareas }),
  obtenerTareas: async () => {
    try {
      const tareas = "/tasks";
      const response = await fetch(URL_ENDPOINT + tareas, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        useUserStore.getState().setTareas(data);
      } else {
        console.error("Error al obtener tareas:", data.error);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  },
  usuarios: [],
  obtenerUsuarios: async () => {
    try {
      const usuariosEndpoint = "/usuarios";
      const response = await fetch(URL_ENDPOINT + usuariosEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const users = JSON.parse(data.body);
      if (response.ok) {
        useUserStore.getState().setUsuarios(users);
      } else {
        console.error("Error al obtener tareas:", data.error);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  },
  setUsuarios: (usuarios) => set({ usuarios }),
  crearTarea: async () => {
    try {
      const tareasEndpoint = "/tasks";
      const userIDValue = sessionStorage.getItem("userID");
        console.log("userIDValue", userIDValue)
        console.log("JAJAJAJA", JSON.stringify({
            titulo: useUserStore.getState().nombreTarea,
            usuario_asignado_id: useUserStore.getState().setNombreAsignado,
            usuario_creador_id: userIDValue,
          }))
      const response = await fetch(URL_ENDPOINT + tareasEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: useUserStore.getState().nombreTarea,
          usuario_asignado_id: useUserStore.getState().setNombreAsignado,
          usuario_creador_id: userIDValue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const tareasItem = JSON.parse(data.body);
        useUserStore.getState().setTareas(tareasItem);
        // Puedes hacer otras acciones después de un inicio de sesión exitoso
      } else {
        useUserStore.getState().setMensaje(data.error);
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      useUserStore.getState().setMensaje("Error interno del servidor");
    }
  },
  nombreTarea: "",
  setNombreTarea: (nombreTarea) => set({ nombreTarea }),
  nombreAsignado: "",
  setNombreAsignado: (nombreAsignado) => set({ nombreAsignado }),
}));

export default useUserStore;
