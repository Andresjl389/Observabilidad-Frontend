
// components/RoleBasedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserRole } from "../../../hooks/useUserRole";


interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = "/main"
}) => {
  const { userInfo, loading } = useUserRole();

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner"></div>
        <p>Verificando permisos...</p>
      </div>
    );
  }

  const userRole = userInfo?.role?.name?.toLowerCase();
  const hasPermission = allowedRoles.some(role => 
    role.toLowerCase() === userRole
  );

  if (!hasPermission) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};


export default RoleBasedRoute