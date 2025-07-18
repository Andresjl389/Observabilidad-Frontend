import { environment } from "../../../environment/local";
import axios from "axios";


const DeleteUser = async(token: string | null, userId: string) => {
console.log("se esta ejecutando aca")
    try {
        const headers = { 
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const response = await axios.delete(`${environment.app_url}/auth/user/${userId}`, {
            headers,
          });
        return response;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default DeleteUser;