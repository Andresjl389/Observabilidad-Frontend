import { environment } from "../../../environment/local";
import axios from "axios";


const SignupService = async(userData:{
    name: string,
    email: string,
    password: string
}) => {
    try {
        const response = await axios.post(`${environment.app_url}/auth/register`,userData);
        return response;
    } catch (error) {
        console.log("Error desde el service: ", error);
    }
}


export default SignupService;