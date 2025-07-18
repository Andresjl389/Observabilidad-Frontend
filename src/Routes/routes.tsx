import React, { Suspense } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  AddInformationComponent,
  Dashboard,
  Home,
  LoginPage,
  ManageTokenScreen,
  ManageUserScreen,
  SignUpScreen,
  TableScreen,
  UserDepurationSection,
  VideosSection,
} from "../UI/Screen";

import PrivateRoute from "./PrivateRoute";
import { Main } from "../UI/Screen/Main";
import { AuthProvider, useAuth } from "../Context/Auth/AuthContext";
import { ROLES } from "../utils/rolePermissions";
import { RoleBasedRoute } from "../UI/Components";

// Componente para el loader durante la carga
const PageLoader = () => (
  <div className="page-loader">
    <div className="spinner"></div>
    <p>Cargando página...</p>
  </div>
);

// Componente para manejar las rutas públicas con redirección basada en autenticación
const PublicRouteWrapper: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Grupo de rutas públicas que redirigen a /main si está autenticado */}
          <Route element={<PublicRouteWrapper />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpScreen />} />
          </Route>

          {/* Rutas privadas que requieren autenticación */}
          <Route element={<PrivateRoute />}>
            {/* Rutas accesibles para usuarios y administradores */}
            <Route
              path="/main"
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                  <Main />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/dashboards"
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                  <Dashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/videos"
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                  <VideosSection />
                </RoleBasedRoute>
              }
            />

            {/* Rutas exclusivas para administradores */}
            <Route
              path="/table-information"
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <TableScreen />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/depuration"
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <UserDepurationSection />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/manage-users"
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <ManageUserScreen />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/manage-token"
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <ManageTokenScreen />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/add-information"
              element={
                <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
                  <AddInformationComponent />
                </RoleBasedRoute>
              }
            />
          </Route>

          {/* Ruta para cualquier otra dirección no definida */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const AppRoute: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default AppRoute;
