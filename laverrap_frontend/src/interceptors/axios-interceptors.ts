import { api } from "@/services";
import { toast } from "sonner";

export const axiosInterceptor = () => {
  api.interceptors.request.use(
    (config) => {
      /** Hacer algo antes que la peticion sea enviada */
      if (config.url?.includes("/auth")) {
        return config; // NO hago nada
      }
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    (error) => {
      /** Hacer algo con el error de la peticion */
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      /** Hacer algo con los datos de la respuesta */
      return response;
    },
    (error) => {
      /** Hacer algo con el error de la respuesta */
      if (error.response.data) {
        if (error.response.status === 403) {
          /** Solo redirigir si NO es una petición de login */
          if (!error.config.url?.includes("/auth/login")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
          }
        }
        console.log("Error backend", error.response.data);
        const message = `Error: ${error.response.data.message}`;
        toast.error(message || "Error en la petición");
        return Promise.reject(error); // el catch lo agarrar con el message ya
      }
      console.log(error);
      return Promise.reject(error);
    },
  );
};
