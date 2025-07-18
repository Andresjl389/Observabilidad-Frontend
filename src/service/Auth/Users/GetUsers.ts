import { environment } from "../../../environment/local";
import axios from "axios";


const GetAllUsers = async(token: string | null) => {

    try {
        const headers = { 
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const response = await axios.get(`${environment.app_url}/auth/all-users`, {
            headers,
          });
        return response.data;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default GetAllUsers;