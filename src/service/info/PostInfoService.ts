import axios, { AxiosError } from "axios";
import { environment } from "../../environment/local";
import { PostInfo } from "../../interfaces/PostInfo";

const PostInfoService = async (formData: PostInfo) => {
  const data = new FormData();
      data.append("type_id", formData.type_id);
      data.append("user_id", formData.user_id);
  
      if (formData.title?.trim()) data.append("title", formData.title);
      if (formData.description?.trim())
        data.append("description", formData.description);
      if (formData.icon) data.append("icon", formData.icon);
      if (formData.link?.trim()) data.append("link", formData.link);
      if (formData.filename instanceof File)
        data.append("file", formData.filename);
  try {
    const response = await axios.post(`${environment.app_url}/info`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("❌ Error en la API:", error.response?.data || error.message);
    } else {
      console.error("❌ Error desconocido:", error);
    }
    throw error;
  }
};

export default PostInfoService;
