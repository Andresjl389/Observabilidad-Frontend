import { environment } from "../../../environment/local";
import axios from "axios";


const GetDisponibilidad = async(token: string | null, is_davicom: boolean, year: number) => {
    console.log("Año: ",year)
    try {
        const headers = { 
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const params = {
            'year': year,
            'is_davicom': is_davicom
        }
        const response = await axios.get(`${environment.app_url}/disponibilidad`, {
            headers,
            params
          });
        return response.data
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default GetDisponibilidad;