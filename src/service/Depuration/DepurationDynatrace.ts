import axios from "axios";
import { environment } from "../../environment/local";

const PostDepuration = async (token: string | null, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const headers = {
      "Authorization": `Bearer ${token}`,
      // NO pongas 'Content-Type' aquí, deja que axios lo maneje automáticamente
    };

    const response = await axios.post(
      `${environment.app_url}/depuration`,
      formData,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.log("Error desde el service: ", error);
  }
};

export default PostDepuration