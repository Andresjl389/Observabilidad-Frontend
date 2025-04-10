import { environment } from "../../environment/local";
import axios from "axios";


const GetTypes = async() => {
    try {
        const headers = { "content-type": "application/json" };
        const response = await axios.get(`${environment.app_url}/types`, {
            headers,
          });
        return response.data.Types;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default GetTypes;