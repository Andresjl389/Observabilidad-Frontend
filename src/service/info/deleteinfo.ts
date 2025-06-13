import { UUID } from "crypto";
import { environment } from "../../environment/local";
import axios from "axios";


const deleteInfo = async(token: string | null, info_id: UUID) => {
    try {
        const headers = { 
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const response = await axios.delete(`${environment.app_url}/info/${info_id}`, {
            headers,
          });
        return response;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default deleteInfo;