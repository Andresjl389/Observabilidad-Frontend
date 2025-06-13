import { environment } from "../../environment/local";
import axios from "axios";


const GetAll = async() => {
    try {
        const headers = { "content-type": "application/json" };
        const response = await axios.get(`${environment.app_url}/info`, {
            headers,
          });
        return response.data;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default GetAll;