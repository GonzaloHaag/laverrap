import { api } from "@/services";

const token = localStorage.getItem("token");

export const axiosInterceptor = () => {
  api.interceptors.request.use(
    (config) => {
      /** Hacer algo antes que la peticion sea enviada */
      if (config.url?.includes("/auth")) {
        return config; // NO hago nada
      }
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => {
      /** Hacer algo con el error de la peticion */
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      /** Hacer algo con los datos de la respuesta */
      return response;
    },
    (error) => {
      /** Hacer algo con el error de la respuesta */
      if (error.response.data) {
        console.log("Error backend", error.response.data);
        return Promise.reject(error.response.data.message); // el catch lo agarrar con el message ya
      }
      console.log(error);
      return Promise.reject(error);
    }
  );
};
