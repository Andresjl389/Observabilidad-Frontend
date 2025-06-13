import { environment } from "../../../environment/local";
import axios from "axios";


const GetApdex = async(token: string | null, startDate: string | undefined , endDate: string | undefined) => {

    try {
        const headers = { 
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const params = {
            "start_date": startDate,
            "end_date": endDate,
        }
        const response = await axios.get(`${environment.app_url}/apdex-metrics`, {
            headers,
            params
          });
        return response.data;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default GetApdex;