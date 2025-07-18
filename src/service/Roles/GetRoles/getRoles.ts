import { environment } from "../../../environment/local";
import axios from "axios";


const GetRoles = async(token: string | null) => {

    try {
        const headers = { 
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const response = await axios.get(`${environment.app_url}/roles`, {
            headers,
          });
        return response.data;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default GetRoles;