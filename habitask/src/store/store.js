import { create } from "zustand";
import { toast } from "react-toastify";

const URL_ENDPOINT =
  "https://6l5cukrr5f.execute-api.us-east-1.amazonaws.com/stage";

const initialState = {
  tareas: [],
};

const useUserStore = create((set) => ({
  nombre: "",
  email: "",
  contrasena: "",
  mensaje: "",
  setNombre: (nombre) => set({ nombre }),
  setEmail: (email) => set({ email }),
  setContrasena: (contrasena) => set({ contrasena }),
  setMensaje: (mensaje) => set({ mensaje }),
  resetForm: () => set({ nombre: "", email: "", contrasena: "" }),
  resetFormTask: () => set({ nombreTarea: "", nombreAsignado: "" }),
  resetMensaje: () => set({ mensaje: "" }),
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
      const responseParse = JSON.parse(data.body);
      if (responseParse.idUsuario) {
        const mensaje = responseParse.mensaje;
        console.log(responseParse, "responseParse")
        useUserStore.getState().setMensaje(mensaje);
        sessionStorage.setItem("token", true);
        sessionStorage.setItem("userID", responseParse.idUsuario);
        window.location.href = "/list-tasks";
        // Puedes hacer otras acciones después de un inicio de sesión exitoso
      } else {
        console.error("Error al realizar la petición de login:");
        useUserStore.getState().setMensaje("Error al realizar la petición de login");
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
  setTarea: (nuevaTarea) =>
    set((state) => ({
      tareas: [...(state.tareas || []), nuevaTarea],
    })),
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
      const responseParse = JSON.parse(data.body);
      if (responseParse.tarea) {
        useUserStore.getState().setMensaje(responseParse.mensaje);
      } else {
        useUserStore.getState().setMensaje("Error");
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
  showToast: (message, options, type) => {
    if (type == "success") {
      toast.success(message, options);
    } else if (type == "error") {
      toast.error(message, options);
    }
    // Puedes agregar más tipos según tus necesidades
  },
  finalizarTarea: async (usuarioAsignadoId, idTarea) => {
    const url = "/notificacion";
    try {
        // Hacer la llamada al servicio aquí
        const response = await fetch(URL_ENDPOINT + url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario_asignado_id: usuarioAsignadoId, idTarea: idTarea }),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Notificación enviada y tarea actualizada correctamente:', result);
          useUserStore.getState().setMensaje("Notificación enviada y tarea actualizada correctamente");
          // Puedes actualizar otros estados según sea necesario
        } else {
          console.error('Error al enviar notificación:', response.statusText);
          useUserStore.getState().setMensaje("Error al enviar notificación");
          // Puedes manejar errores y actualizar estados correspondientes
        }
      } catch (error) {
        console.error('Error en la llamada al servicio:', error);
        useUserStore.getState().setMensaje("Error en la llamada al servicio");
        // Puedes manejar errores y actualizar estados correspondientes
      }
  },
}));

export default useUserStore;
