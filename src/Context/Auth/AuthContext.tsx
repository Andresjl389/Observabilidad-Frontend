import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Definir la interfaz para el contexto
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

// Crear el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Función para verificar si un token JWT ha expirado
const isTokenExpired = (token: string): boolean => {
  try {
    // Decodificar el token para obtener la carga útil (payload)
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Obtener la fecha de expiración del token (exp está en segundos)
    const expirationTime = payload.exp * 1000; // Convertir a milisegundos
    
    // Verificar si ha expirado comparando con la hora actual
    return Date.now() >= expirationTime;
  } catch (error) {
    // Si hay un error al decodificar el token, considerarlo como expirado
    console.error('Error al verificar el token:', error);
    return true;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Verificar si hay un token al cargar la página
    const storedToken = localStorage.getItem('access_token');
    
    if (storedToken) {
      // Validar si el token ha expirado
      const tokenIsValid = !isTokenExpired(storedToken);
      
      if (tokenIsValid) {
        // El token es válido, autenticar al usuario
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        // El token ha expirado, eliminar del localStorage
        console.log('Token expirado, cerrando sesión...');
        logout();
      }
    }
  }, []);

  const login = (accessToken: string): void => {
    localStorage.setItem('access_token', accessToken);
    setToken(accessToken);
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    localStorage.removeItem('access_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto con seguridad de tipos
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
