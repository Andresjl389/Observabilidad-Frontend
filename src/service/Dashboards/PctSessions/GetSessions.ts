import { environment } from "../../../environment/local";
import axios from "axios";


const GetPctSession = async(token: string | null) => {

    try {
        const headers = { 
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const response = await axios.get(`${environment.app_url}/sesiones`, {
            headers,
          });
        return response.data.sessions;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default GetPctSession;