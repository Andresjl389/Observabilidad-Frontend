// hooks/useUserRole.ts
import { useState, useEffect } from "react";
import { GetInfoUsers } from "../service";
import { useAuth } from "../Context/Auth/AuthContext";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: {
    name: string;
  };
}

export const useUserRole = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Asumiendo que tienes el token en tu AuthContext

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await GetInfoUsers(token);
        setUserInfo(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Error al obtener información del usuario");
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  const isAdmin = () => {
    return userInfo?.role?.name?.toLowerCase() === "administrador";
  };

  const isUser = () => {
    return userInfo?.role?.name?.toLowerCase() === "usuario" || 
           userInfo?.role?.name?.toLowerCase() === "user";
  };

  return {
    userInfo,
    loading,
    error,
    isAdmin: isAdmin(),
    isUser: isUser(),
    roleName: userInfo?.role?.name || null
  };
};
