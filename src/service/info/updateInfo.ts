import { environment } from "../../environment/local";
import axios from "axios";

const UpdateInfo = async (
  token: string | null,
  formData: {
    id: string;
    type_id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
  }
) => {
  const data = new URLSearchParams();
  data.append("type_id", formData.type_id);
  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("icon", formData.icon);
  data.append("link", formData.link);

  const response = await axios.put(
    `${environment.app_url}/info/${formData.id}`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export default UpdateInfo;
