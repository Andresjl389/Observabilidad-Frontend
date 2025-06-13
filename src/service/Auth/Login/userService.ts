import axios from "axios";
import { environment } from "../../../environment/local";

// Define un tipo para la respuesta del usuario
export interface UserResponse {
  email: string;
  name?: string;
}
export const getCurrentUser = async (): Promise<UserResponse | null> => {
  try {
    console.log("Intentando obtener usuario actual...");
    const response = await axios.get(`${environment.app_url}/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    
    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el usuario actual:", error);
    return null;
  }
};

export default getCurrentUser;