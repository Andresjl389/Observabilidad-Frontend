import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

// Definir la interfaz para el contexto
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  checkTokenValidity: () => boolean;
}

// Crear el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Función para verificar si un token JWT ha expirado
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000;
    return Date.now() >= expirationTime - 30000;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return true;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = useCallback((): void => {
    localStorage.removeItem("access_token");
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  const checkTokenValidity = useCallback((): boolean => {
    const currentToken = token || localStorage.getItem("access_token");
    if (!currentToken) return false;

    const tokenIsValid = !isTokenExpired(currentToken);
    if (!tokenIsValid) {
      console.log("Token expirado detectado, cerrando sesión...");
      logout();
      return false;
    }

    return true;
  }, [token, logout]);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      const tokenIsValid = !isTokenExpired(storedToken);
      if (tokenIsValid) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        console.log("Token expirado al cargar, cerrando sesión...");
        logout();
      }
    }
  }, [logout]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const intervalId = setInterval(() => {
      checkTokenValidity();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [isAuthenticated, checkTokenValidity]);

  const login = (accessToken: string): void => {
    localStorage.setItem("access_token", accessToken);
    setToken(accessToken);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
        checkTokenValidity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
