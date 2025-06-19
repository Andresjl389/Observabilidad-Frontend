import { environment } from "../../../environment/local";
import axios from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export const loginService = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const headers = { "Content-Type": "application/json" };
    const response = await axios.post(`${environment.app_url}/auth/login`, credentials, { headers });

    const token = response.data?.access_token;
    if (token) {
      localStorage.setItem("access_token", token);  // Consistencia clave
    }

    return { access_token: token };  // Devuelve objeto consistente
  } catch (error: any) {
    console.error("Error en el servicio de login:", error);
    if (error.response) {
      const message = error.response.data?.detail || "Error en el inicio de sesión";
      throw new Error(message);
    } else if (error.request) {
      throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
    } else {
      throw new Error("Error al procesar la solicitud de inicio de sesión");
    }
  }
};

export default loginService;
