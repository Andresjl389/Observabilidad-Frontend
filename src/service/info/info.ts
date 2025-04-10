import { environment } from "../../environment/local";
import axios from "axios";


const GetInfo = async(type_id: string) => {
    try {
        const headers = { "content-type": "application/json" };
        const params:{type_id:string} = { type_id };  // Agregamos los parámetros de la URL
        const response = await axios.get(`${environment.app_url}/info-by`, {
            headers,
            params

          });
        return response.data.Info;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default GetInfo;