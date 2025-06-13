import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/Auth/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Si el usuario está autenticado, renderiza el Outlet (componentes hijos)
  // Si no está autenticado, redirige a la página de login, guardando la ubicación actual
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;