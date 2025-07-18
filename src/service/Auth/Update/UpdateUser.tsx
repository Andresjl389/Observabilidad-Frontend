import { environment } from "../../../environment/local";
import axios from "axios";

const UpdateUser = async (
  token: string | null,
  userData: {
    id: string;
    name: string;
    email: string;
    roleId: string;
  }
) => {
    
  try {
    const response = await axios.put(
      `${environment.app_url}/auth/user`,
      {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role_id: userData.roleId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error desde el service: ", error);
  }
};

export default UpdateUser;
