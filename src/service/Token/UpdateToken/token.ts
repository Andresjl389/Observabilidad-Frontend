import { environment } from "../../../environment/local";
import axios from "axios";

const UpdateToken = async (
  token: string | null,
  tokenData: {
    id: string;
    title: string;
    token: string;
  }
) => {
    
  try {
    const response = await axios.put(
      `${environment.app_url}/token/${tokenData.id}`,
      {
        title: tokenData.title,
        token: tokenData.token,
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

export default UpdateToken;
